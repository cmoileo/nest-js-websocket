import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('messages')
@UseGuards(JwtAuthGuard, RoleGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @Roles('user')
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @Roles('user')
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @Roles('user')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  @Roles('user')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  @Roles('moderator')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
