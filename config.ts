import chalk from 'chalk'
import {Document} from 'mongoose'

export interface Res {
  state: string,
  msg: string,
}

export interface UserRes extends Res {
  user: Document
}

export const port: number = +process.env.PORT || 3000;
export const hostname: string = '127.0.0.1';
export const callback: Function = () => console.log(`server is running on ${chalk.green(hostname)}:${chalk.green(port + '')}`);
export const url: string = 'mongodb://nodemailer:test1234@ds249137.mlab.com:49137/nodemailer-api1';

