import { IsArray, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title?: string;
  @IsArray()
  @IsString({ each: true })
  @Length(1, 30, { each: true })
  tags?: string[];
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  content?: string;
  @IsString()
  @IsIn(['active', 'archived'])
  status: string = 'active';
}
