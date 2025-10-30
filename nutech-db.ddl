-- Nutech Database
-- Database: PostgreSQL

-- Create users table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       name VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create balances table
CREATE TABLE balances (
                          id SERIAL PRIMARY KEY,
                          user_id INTEGER NOT NULL UNIQUE,
                          balance DECIMAL(15, 2) NOT NULL DEFAULT 0,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT fk_balances_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create services table
CREATE TABLE services (
                          id SERIAL PRIMARY KEY,
                          service_code VARCHAR(255) NOT NULL UNIQUE,
                          service_name VARCHAR(255) NOT NULL,
                          service_tariff DECIMAL(15, 2) NOT NULL,
                          description TEXT,
                          is_active BOOLEAN NOT NULL DEFAULT true,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create top_ups table
CREATE TABLE top_ups (
                         id SERIAL PRIMARY KEY,
                         user_id INTEGER NOT NULL,
                         amount DECIMAL(15, 2) NOT NULL,
                         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT fk_top_ups_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create transactions table
CREATE TABLE transactions (
                              id SERIAL PRIMARY KEY,
                              invoice_number VARCHAR(255) NOT NULL UNIQUE,
                              user_id INTEGER NOT NULL,
                              service_id INTEGER,
                              service_code VARCHAR(255),
                              service_name VARCHAR(255),
                              total_amount DECIMAL(15, 2) NOT NULL,
                              description TEXT,
                              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                              CONSTRAINT fk_transactions_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_invoice_number ON transactions(invoice_number);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_balances_updated_at
    BEFORE UPDATE ON balances
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();