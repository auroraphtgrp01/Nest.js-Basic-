import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '~/decorator/customize'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const isPubic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
    if (isPubic) return true
    return super.canActivate(context)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: 'Invalid Token or Token Expired' })
    }
    const request: Request = context.switchToHttp().getRequest()
    const targetMethod = request.method
    const targetEndpoint = request?.route.path as string
    const permissions = user.permissions ?? []
    let isAlowed: boolean = permissions.some((permissions) => {
      const { method, apiPath } = permissions
      if (targetEndpoint.includes(apiPath) && method === targetMethod) return true
    })
    if (targetEndpoint.startsWith('/api/v1/auth')) isAlowed = true
    if (!isAlowed) {
      throw new ForbiddenException({ message: 'You dont have permission to access this endpoint' })
    }
    return user
  }
}
