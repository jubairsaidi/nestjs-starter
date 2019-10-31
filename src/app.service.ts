import { Injectable } from '@nestjs/common';

export interface StatusResponse {
  serviceName: string;
  gitHash: string;
  version: string;
}

@Injectable()
export class AppService {
  getStatus(): StatusResponse {
    return {
      serviceName: process.env.npm_package_name,
      gitHash: process.env.npm_package_gitHead,
      version: process.env.npm_package_version
    };
  }
}
