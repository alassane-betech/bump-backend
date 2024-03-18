import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BattleEntity } from "./entities/battle.entity";
import { BattleService } from "./services/battle.service";

@Controller("battles")
export class BattleController {}
