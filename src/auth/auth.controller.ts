import { Controller, Post, UseGuards, Body, Res, Req, Get } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { Public, ResponseMessage, User } from '~/decorator/customize'
import { RegisterUserDto } from '~/Users/dto/create-user.dto'
import { Response } from 'express'
import { UserType } from '~/interface/user.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /*
   * @Route: /auth/login
   * @Method: POST
   * @Access: Public
   * @Desc: Login User
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('User Login')
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res)
  }
  /*
   * @Route: /auth/register
   * @Method: POST
   * @Access: Public
   * @Desc: Register User
   */
  @ResponseMessage('User Register')
  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }
  /*
   * @Route: /auth/account
   * @Method: GET
   * @Access: Private
   * @Desc: Get Account User By JWT
   */
  @ResponseMessage('Get Account User By JWT')
  @Get('account')
  getAccount(@User() user: UserType) {
    return { user }
  }
  /*
   * @Route: /auth/refresh
   * @Method: GET
   * @Access: Public
   * @Desc: Refresh Token
   */
  @Public()
  @ResponseMessage('Refresh Token')
  @Get('refresh')
  handleRefres(@Req() req, @Res({ passthrough: true }) res: Response) {
    const refresh_token = req.cookies['refresh_token']
    return this.authService.processRefreshToken(refresh_token, res)
  }
  @ResponseMessage('Logout User')
  @Get('logout')
  async logout(@User() user: UserType, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(user._id, res)
  }
}
