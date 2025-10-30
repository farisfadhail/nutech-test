import { createContainer, asValue } from "awilix";
import prisma from "../prisma/client.js";

import repositoryProvider from "./repositoryProvider.js";
import serviceProvider from "./serviceProvider.js";
import handlerProvider from "./handlerProvider.js";

const container = createContainer();

container.register({
  prisma: asValue(prisma),
});

container.register({
  ...repositoryProvider,
  ...serviceProvider,
  ...handlerProvider,
});

export default container;
