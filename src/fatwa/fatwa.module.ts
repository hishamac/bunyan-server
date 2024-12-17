import { Module } from '@nestjs/common';
import { FatwaService } from './fatwa.service';
import { FatwaResolver } from './fatwa.resolver';
import { CredentialModule } from 'src/credential/credential.module';

@Module({
  imports: [CredentialModule],
  providers: [FatwaResolver, FatwaService],
})
export class FatwaModule {}
