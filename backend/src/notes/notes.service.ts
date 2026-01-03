import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/decorators/user.decorator';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(userId, createNoteDto: CreateNoteDto) {
    if (!isValidObjectId(userId))
      throw new BadRequestException('invalid mongo id');
    const note = await this.noteModel.create({
      ...createNoteDto,
      user: userId,
    });

    await this.usersService.addNote(userId, note._id);
    return note;
  }
  

  async findAll(userId) {
    if (!isValidObjectId(userId))
      throw new BadRequestException('invalid mongo id');
    return await this.noteModel.find({ user: userId }).populate(User.name);
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid mongo id');
    const note = await this.noteModel.findById(id);
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid mongo id');
    const note = await this.noteModel.findByIdAndUpdate(id, updateNoteDto, {new: true});
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid mongo id');
    const note = await this.noteModel.findByIdAndDelete(id);
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  async removeNoteByUserId(userId) {
    if (!isValidObjectId(userId))
      throw new BadRequestException('invalid mongo id');
    await this.noteModel.deleteMany({ user: userId });
  }
}
