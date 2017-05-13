//
//  UIMacro.h
//  CreditInvestigation
//
//  Created by 缺月梧桐 on 2016/12/19.
//  Copyright © 2016年 yishilvren. All rights reserved.
//

#ifndef UIMacro_h
#define UIMacro_h


/*********************************************************
 *
 *  自定义宏区域
 *
 *********************************************************/


/**
 *  颜色
 */

#define HMColor(r,g,b) [UIColor colorWithRed:(r) / 255.0 green:(g) / 255.0 blue:(b) / 255.0 alpha:1]
#define HMTintColor HMColor(94, 185, 173)
#define BASE_COLOUR [UIColor colorWithRed:242/255.0 green:242/255.0 blue:242/255.0 alpha:1]
#define LOGBTN_COLOUR [UIColor colorWithRed:32/255.0 green:186/255.0 blue:248/255.0 alpha:1]

#define BLUE_COLOUR [UIColor colorWithRed:7/255.0 green:71/255.0 blue:145/255.0 alpha:1]
#define LIGHT_BLUE_COLOUR [UIColor colorWithRed:33/255.0 green:150/255.0 blue:226/255.0 alpha:1]
#define GREEN_COLOUR [UIColor colorWithRed:148/255.0 green:206/255.0 blue:88/255.0 alpha:1]
//#define COLOR_MainColor         CICOLOR_RGB(0xf2f2f2) //灰色 -- 页面背景主颜色
//#define COLOR_BlueColor         CICOLOR_RGB(0x00a9f2) //蓝色 -- 导航栏背景颜色
//#define COLOR_WhiteColor        CICOLOR_RGB(0xffffff) //白色
//#define COLOR_BlackColor        CICOLOR_RGB(0x6b6b6b) //黑色
//#define COLOR_MainFontColor     CICOLOR_RGB(0x848484) //黑色 -- 文本颜色
//
//#define COLOR_DarkFontColor     CICOLOR_RGB(0x424242) //黑色 -- 深文本颜色
//#define COLOR_LightFontColor    CICOLOR_RGB(0xd1d1d1) //黑色 -- 浅文本颜色
//#define COLOR_LightFontColor    CICOLOR_RGB(0xd1d1d1)

/**
 *  字体大小
 */
#define Font_Thirtieth_S    CI_S_FONT(AdaptedWidth(30.0f))
#define Font_Thirtieth_B    CI_S_BOLD_FONT(AdaptedWidth(30.0f))
#define Font_TwentyFour_S    CI_S_FONT(AdaptedWidth(24.0f))
#define Font_TwentyFour_B    CI_S_BOLD_FONT(AdaptedWidth(24.0f))
#define Font_TwentyTwo_S    CI_S_FONT(AdaptedWidth(22.0f))
#define Font_TwentyTwo_B    CI_S_BOLD_FONT(AdaptedWidth(22.0f))
#define Font_Eighteen_S      CI_S_FONT(AdaptedWidth(18.0f))
#define Font_Eighteen_B      CI_S_BOLD_FONT(AdaptedWidth(18.0f))
#define Font_Sixteen_S       CI_S_FONT(AdaptedWidth(16.0f))
#define Font_Sixteen_B       CI_S_BOLD_FONT(AdaptedWidth(16.0f))
#define Font_Fifteen_S       CI_S_FONT(AdaptedWidth(15.0f))
#define Font_Fifteen_B       CI_S_BOLD_FONT(AdaptedWidth(15.0f))
#define Font_Fourteen_S      CI_S_FONT(AdaptedWidth(14.0f))
#define Font_Fourteen_B      CI_S_BOLD_FONT(AdaptedWidth(14.0f))
#define Font_Thirteen_S      CI_S_FONT(AdaptedWidth(13.0f))
#define Font_Thirteen_B      CI_S_BOLD_FONT(AdaptedWidth(13.0f))
#define Font_Twelve_S        CI_S_FONT(AdaptedWidth(12.0f))
#define Font_Twelve_B        CI_S_BOLD_FONT(AdaptedWidth(12.0f))
#define Font_Eleven_S        CI_S_FONT(AdaptedWidth(11.0f))
#define Font_Eleven_B        CI_S_BOLD_FONT(AdaptedWidth(11.0f))
#define Font_Ten_S           CI_S_FONT(AdaptedWidth(10.0f))
#define Font_Ten_B           CI_S_BOLD_FONT(AdaptedWidth(10.0f))
#define Font_Nine_S          CI_S_FONT(AdaptedWidth(9.0f))
#define Font_Nine_B          CI_S_BOLD_FONT(AdaptedWidth(9.0f))

/**
 *  布局
 */
#define H_TABBAR            49
#define H_NAVIGATIONBAR     64
#define H_STATUSBAR         20

//获取View的属性
#define GetViewWidth(view)  view.frame.size.width
#define GetViewHeight(view) view.frame.size.height
#define GetViewX(view)      view.frame.origin.x
#define GetViewY(view)      view.frame.origin.y

// 是否空对象
#define IS_NULL_CLASS(OBJECT) [OBJECT isKindOfClass:[NSNull class]]



/*********************************************************
 *
 *  常用宏区域（固定）
 *
 *********************************************************/
/** 主屏幕的高度 */
#define SCREENHEIGHT [[UIScreen mainScreen] bounds].size.height

/** 主屏幕的宽度 */
#define SCREENWIDTH  [[UIScreen mainScreen] bounds].size.width

/** 主屏幕的高度比例 */
#define SCREENHEIGHT_RATIO (SCREENHEIGHT / 667.0)

/** 主屏幕的宽度比例 */
#define SCREENWIDTH_RADIO  (SCREENWIDTH / 375.0)



/** 屏幕的分辨率 当结果为1时，显示的是普通屏幕，结果为2时，显示的是Retian屏幕 */
#define SCREEN_SCALE [[UIScreen mainScreen] scale]



/** 除去信号区的屏幕的frame */
#define APP_FRAME  [[UIScreen mainScreen] applicationFrame]

/** 应用程序的屏幕高度 */
#define APP_FRAME_H   [[UIScreen mainScreen] applicationFrame].size.height

/** 应用程序的屏幕宽度 */
#define APP_FRAME_W    [[UIScreen mainScreen] applicationFrame].size.width


/** 系统控件的默认高度 */
#define STATUS_BAR_H   (20.f)
#define TOP_BAR_H      (44.f)
#define BOTTOM_BAR_H   (49.f)
#define CELL_H (44.f)


/** 中英状态下键盘的高度 */
#define ENG_KEY_BOARD_H  (216.f)
#define CHN_KEY_BOARD_H  (252.f)



/*  获取自适应高度 */
#define AutoHeight(x) ((x) * (1.0) / (667) * (SCREENHEIGHT))

/*  获取自适应宽度 */
#define AutoWidth(x) ((x) * (1.0) / (375) * (SCREENWIDTH))

/** 中文字体 */
#define CHINESE_FONT_NAME  @"Heiti SC"
#define CHINESE_SYSTEM(x) [UIFont fontWithName:CHINESE_FONT_NAME size:x]

/** 字体大小 */
#define CI_FONT(NAME,FONTSIZE) [UIFont fontWithName:(NAME) size:(FONTSIZE)]
#define CI_S_FONT(FONTSIZE)    [UIFont systemFontOfSize:FONTSIZE]
#define CI_S_BOLD_FONT(FONTSIZE)   [UIFont boldSystemFontOfSize:FONTSIZE]

/** 不同屏幕尺寸字体适配（375，667是因为效果图为IPHONE6 如果不是则根据实际情况修改）*/
#define AdaptedWidth(x)  ceilf((x) * SCREENWIDTH_RADIO)
#define AdaptedHeight(x) ceilf((x) * SCREENHEIGHT_RATIO)
#define AdaptedFontSize(R)     CHINESE_SYSTEM(AdaptedWidth(R))

/** 颜色(RGB) */
#define CI_RGB(r,g,b)  [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:1];
#define CI_RGBA(r,g,b,a)   [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:(a)]

/** 颜色(0xFFFFFF) */
#define CICOLOR_RGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]
#define CICOLOR_RGBA(rgbValue,a) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:(a)]


/** 资源路径 */
#define PNG_PATH(NAME) [[NSBundle mainBundle] pathForResource:[NSString stringWithUTF8String:NAME] ofType:@"png"]
#define JPG_PATH(NAME) [[NSBundle mainBundle] pathForResource:[NSString stringWithUTF8String:NAME] ofType:@"jpg"]
#define PATH(NAME,EXT) [[NSBundle mainBundle] pathForResource:(NAME) ofType:(EXT)]

/** 加载图片 */
#define PNG_IMAGE_FILE(NAME)         [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:(NAME) ofType:@"png"]]
#define JPG_IMAGE_FILE(NAME)         [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:(NAME) ofType:@"jpg"]]
#define IMAGE_FILE(NAME,EXT)        [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:(NAME) ofType:(EXT)]]
#define GetIMAGE(imageName) [UIImage imageNamed:[NSString stringWithFormat:@"%@",imageName]]


//Library/Caches 文件路径
#define FilePath ([[NSFileManager defaultManager] URLForDirectory:NSCachesDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:YES error:nil])
//获取temp
#define kPathTemp NSTemporaryDirectory()
//获取沙盒 Document
#define kPathDocument [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject]
//获取沙盒 Cache
#define kPathCache [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject]


#endif /* UIMacro_h */
