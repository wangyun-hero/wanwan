//
//  GVUserDefaults+Properties.h
//  CreditInvestigation
//
//  Created by 缺月梧桐 on 2016/12/19.
//  Copyright © 2016年 yishilvren. All rights reserved.
//


#import "GVUserDefaults.h"
#define WYUserDefault [GVUserDefaults standardUserDefaults]

@interface GVUserDefaults (Properties)

@property (nonatomic,assign) BOOL isNoFirstLaunch;// APP是否第一次启动
@property (nonatomic,copy) NSString * token; // 用户登录token

@property (nonatomic,strong) NSDictionary * versionInfoDict; // 版本信息
@property (nonatomic,strong) NSDictionary * userInfoDict; // 用户信息
@property (nonatomic,strong) NSDictionary * mapLocationInfoDict; // 定位信息
// 注册或者登陆成功返回的authcode
@property(nonatomic,copy) NSString *authcode;
// 注册或者登陆返回的id
@property(nonatomic,copy) NSString *userID;
// 极光注册的devicetoken
@property(nonatomic,copy) NSString *deviceToken;
// 极光的registID
@property(nonatomic,copy) NSString *registID;
// 七牛的token
@property(nonatomic,copy) NSString *qiniuToken;

@end
