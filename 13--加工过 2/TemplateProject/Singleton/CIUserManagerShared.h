//
//  CIUserManagerShared.h
//  CreditInvestigation
//
//  Created by 缺月梧桐 on 2016/12/20.
//  Copyright © 2016年 yishilvren. All rights reserved.
//

#import <Foundation/Foundation.h>
//#import "CIUserModel.h" // 用户登录信息Model类
//#import "CICheckVersionModel.h" // 版本检测Model类
//#import "CIMapLocationModel.h" // 定位信息Model类


@interface CIUserManagerShared : NSObject
+ (instancetype )sharedInstance;
- (void)homeViewController;
@end
