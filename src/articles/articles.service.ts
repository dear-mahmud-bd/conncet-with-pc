// src/articles/articles.service.ts

import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.article.findMany();
    // return `This action returns all articles`;
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    return this.prisma.article.findUnique({ where: { id } });
    // return `This action returns a #${id} article`;
  }

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
    // return 'This action adds a new article';
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
    // return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
    // return `This action removes a #${id} article`;
  }

}
