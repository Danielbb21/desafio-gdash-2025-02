import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class DefaultUserProvider implements OnModuleInit {
  private readonly logger = new Logger(DefaultUserProvider.name);

  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!email || !password) {
      this.logger.warn(
        'DEFAULT_ADMIN_EMAIL ou DEFAULT_ADMIN_PASSWORD não configurados',
      );
      return;
    }

    try {
      await this.userService.findOneByEmail(email);
      this.logger.log(`Usuário admin já existe: ${email}`);
    } catch {
      await this.userService.create({
        email,
        password,
        confirmPassword: password,
        name: 'Admin',
      });

      this.logger.log(`Usuário admin criado automaticamente (${email})`);
    }
  }
}
