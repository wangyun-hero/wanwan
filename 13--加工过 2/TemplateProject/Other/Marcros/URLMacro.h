//
//  URLMacro.h
//  CreditInvestigation
//
//  Created by 缺月梧桐 on 2016/12/19.
//  Copyright © 2016年 yishilvren. All rights reserved.
//

#ifndef URLMacro_h
#define URLMacro_h

/*********************************************************
 *
 *  自定义宏区域
 *
 *********************************************************/


//#define __FINALSERVER__
#ifdef __FINALSERVER__

//正式服务器
#define DomainURL @"http://59.110.104.39:8080/"       // 域名
#define Version @""                             // 版本号
#define BaseURL DomainURL Version @"https://zhengxin.appflint.com/"  // 基类服务器接口
#else


//测试服务器
#define DomainURL @"http://59.110.104.39:8080/"       // 域名
#define Version @""                             // 版本号
#define BaseURL DomainURL Version @"https://zhengxin.appflint.com/"  // 基类服务器接口

#endif



/*********************************************************
 *
 *  常用宏区域（固定）
 *
 *********************************************************/

#define SuccessCode @"0000"              // 请求成功






#endif /* URLMacro_h */
