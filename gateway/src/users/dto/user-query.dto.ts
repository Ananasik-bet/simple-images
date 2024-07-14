import { Transform } from 'class-transformer';
import { IsString, IsOptional, Min, IsInt } from 'class-validator';

export class GetListQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 15;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsString()
  email?: string;
}
