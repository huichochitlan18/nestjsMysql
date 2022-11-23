import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
    //   if (!user) {
    //     throw new InternalServerErrorException('user not found (request)');
    //   }
    //   return !data ? user : user[data];
  },
);
