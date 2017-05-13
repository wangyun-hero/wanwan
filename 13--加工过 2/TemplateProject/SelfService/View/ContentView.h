//
//  ContentView.h
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ContentView : UIView
@property(nonatomic,copy)NSString *title;
@property(nonatomic,copy)NSString *content;
-(instancetype)initWithFrame:(CGRect)farame withTitle:(NSString *)title withContent:(NSString *)content;
@end
