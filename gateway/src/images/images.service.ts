import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, file: Express.Multer.File) {
    const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    const link = uuidv4();
    const filePath = path.join(__dirname, '..', '..', '..', 'static', link);
    // Save file to the disk
    fs.writeFileSync(filePath, file.buffer);

    const imageData = {
      name: file.originalname,
      hash: hash,
      link: link,
      user: { connect: { id: userId } },
    };

    return this.prisma.userImage.create({ data: imageData });
  }
}
