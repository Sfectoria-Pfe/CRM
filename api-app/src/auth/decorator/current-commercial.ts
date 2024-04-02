import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCommerciale = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.commerciale;
  },
);