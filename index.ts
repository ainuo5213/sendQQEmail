import {hostname, port, callback, Res, UserRes} from './config'
import {Request, Response} from 'express'
import {Document} from "mongoose";
import User from './models/User'
import {SentMessageInfo, Transporter, SendMailOptions} from "nodemailer";

const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const app = express();
require('dotenv').config();


// parse for application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse for application/json
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  res.json({status: 200, data: 'server is running'})
});

app.post('/addUser', async (req: Request, res: Response) => {
  try {
    let user: Document = await User.findOne({username: req.body['username']});
    if (user) {
      const data: Res = {
        state: 'failed',
        msg: '该用户已存在'
      };
      res.status(400).json(data)
    } else {
      const {username, password, email} = req.body;
      const newUser: Document = new User({
        username,
        pwd: password,
        email
      });
      let savedUser: Document = await newUser.save();
      const data: UserRes = {
        state: 'success',
        msg: '添加用户成功',
        user: savedUser
      };
      res.status(200).json(data)
    }
  } catch (e) {
    console.log(e)
  }
});

app.post('/findPwd', async (req: Request, res: Response) => {
  try {
    const {email, username} = req.body;
    let user: any = await User.findOne({username});
    if (user) {
      // step1: 创建一个transporter
      let transporter: Transporter = nodeMailer.createTransport({
        service: 'qq',
        secure: true,
        // 验证
        auth: {
          user: (process && process.env && process.env.EMAIL) || '1660998482@qq.com',
          pass: (process && process.env && process.env.PASSWORD) || 'jwtxwszsogljeaac'
        }
      });
      // step2
      let mailOptions: SendMailOptions = {
        // 从哪发到哪去
        from: '1660998482@qq.com',
        to: email,
        // 发送邮箱的标题
        subject: '找回密码',
        text: `您的用户名：${user.username}，密码${user.pwd}`
      };
      // step 3
      transporter.sendMail(mailOptions, (err: Error | null, data: SentMessageInfo) => {
        if (err) {
          const data: Res = {
            state: 'failed',
            msg: '发送失败'
          };
          res.status(400).json(data);
        } else {
          const data: Res = {
            state: 'success',
            msg: `密码已发送至您的邮箱${email}`
          };
          res.status(200).json(data)
        }
      })
    } else {
      const data: Res = {
        state: 'failed',
        msg: '该用户不存在',
      };
      res.status(400).json(data)
    }
  } catch (e) {
    console.log(e)
  }
});

app.listen(port, hostname, callback);
