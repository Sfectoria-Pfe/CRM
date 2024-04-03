import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './decorator/current-user';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/employee')
  loginEmployee(@Body() dto: LoginDto) {
    return this.authService.loginEmployee(dto);
  }
  @Post('login/client')
  loginClient(@Body() dto: LoginDto) {
    return this.authService.loginClient(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('update-me')
  updateMe(@Body() dto: UpdateAuthDto, @CurrentUser() user) {
    return this.authService.updateMe(dto, user.id);
  }
  @ApiSecurity('apiKey') // for swagger
  @UseGuards(JwtAuthGuard) // the get don't work without token
  @Get('me')
  async findMe(@Request() req, @CurrentUser() user) {
    // get all oject of request
    return await this.authService.getMyInfo(
      req.get('Authorization').replace('Bearer ', ''),
    );
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
