//
//  DeviceMacro.h
//  CreditInvestigation
//
//  Created by 缺月梧桐 on 2016/12/29.
//  Copyright © 2016年 yishilvren. All rights reserved.
//

#ifndef DeviceMacro_h
#define DeviceMacro_h

/*********************************************************
 *
 *  自定义宏区域
 *
 *********************************************************/


#define IS_IOS6 (SYSTEM_VERSION >= 6.0 && SYSTEM_VERSION < 7)
#define IS_IOS7 (SYSTEM_VERSION >= 7.0 && SYSTEM_VERSION < 8.0)
#define IS_IOS8 (SYSTEM_VERSION >= 8.0 && SYSTEM_VERSION < 9.0)
#define IS_IOS9 (SYSTEM_VERSION >= 9.0 && SYSTEM_VERSION < 10.0)

/** 设备判断 */
#define IS_IPHONE [[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone
#define IS_PAD (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)

/** iPhone的型号 */
#define IS_IPHONE4 ([[UIScreen mainScreen] bounds].size.height == 480)
#define IS_IPHONE5 ([[UIScreen mainScreen] bounds].size.height == 568)
#define IS_IPHONE6 ([[UIScreen mainScreen] bounds].size.height == 667)
#define IS_IPHONE6_PLUS ([[UIScreen mainScreen] bounds].size.height == 736)

/** 系统的版本号 */
#define SYSTEM_VERSION [[[UIDevice currentDevice] systemVersion] floatValue]

/** APP版本号 */
#define APP_VERSION  [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"]

/** APP BUILD 版本号 */
#define APP_BUILD_VERSION  [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]

/** APP名字 */
#define APP_DISPLAY_NAME  [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"]

/** 当前语言 */
#define LOCAL_LANGUAGE [[NSLocale currentLocale] objectForKey:NSLocaleLanguageCode]

/** 当前国家 */
#define LOCAL_COUNTRY [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode]

/** 当前使用Xcode iPhone OS SDK 的版本
 #if __IPHONE_OS_VERSION_MAX_ALLOWED > __IPHONE_8_0
 NSLog(@"当前使用Xcode iPhone OS SDK 8.0 以后版本的处理");
 #else
 NSLog(@"当前使用Xcode iPhone OS SDK 8.0 之前版本的处理");
 #endif
 */

/** 判断设备室真机还是模拟器 */
#if TARGET_OS_IPHONE
#endif

#if TARGET_IPHONE_SIMULATOR
#endif

/** 判断系统为64位还是32位
 #if __LP64__
 NSLog(@"64");
 #else
 NSLog(@"32");
 #endif
 */

#endif /* DeviceMacro_h */
