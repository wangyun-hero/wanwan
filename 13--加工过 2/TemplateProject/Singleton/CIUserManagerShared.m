//
//  CIUserManagerShared.m
//  CreditInvestigation
//
//  Created by 缺月梧桐 on 2016/12/20.
//  Copyright © 2016年 yishilvren. All rights reserved.
//

#import "CIUserManagerShared.h"
#import "AppDelegate.h"
@implementation CIUserManagerShared

/*!
 *	@brief	CIUserManagerShared 的单列
 *
 *	@return	instancetype
 */
+ (instancetype)sharedInstance
{
    static id sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[[self class] alloc] init];
    });
    
    return sharedInstance;
}

- (void)homeViewController{
    
    [((AppDelegate *) AppDelegateInstance) setupHomeViewController];

    // 登录
    
}

@end
