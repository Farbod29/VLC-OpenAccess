import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type VotesDocument = Votes & Document;

// {
//   experience_id: String,
//   image_url: String,
//   timestamp: Date,
//   userId: String,
//   stepID: String,
//   vote: String,
//   demographicsVote: String,
// },

@Schema({ collection: 'image_reaction_flats' })
export class Votes {
  @Prop()
  experience_id: string;
  @Prop()
  image_url: string;
  @Prop()
  timestamp: Date;
  @Prop()
  userId: string;
  @Prop()
  stepID: string;
  @Prop()
  vote: String;
  @Prop()
  demographicsVote: string;
  @Prop()
  createdAt: 'created_at';
  @Prop()
  updated_at: 'updated_at';
}

export const VotesSchema = SchemaFactory.createForClass(Votes);
