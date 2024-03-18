import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { VoteEntity } from "./entities/vote.entity";
import { VoteService } from "./services/vote.service";

@Controller("votes")
export class VoteController {}
