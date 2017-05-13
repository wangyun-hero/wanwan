//
//  ContentView.m
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "ContentView.h"
//#import <Masonry/Masonry.h>
@interface ContentView()
@property(nonatomic,strong)UILabel *label;
@end

@implementation ContentView

//-(instancetype)initWithFrame:(CGRect)frame
//{
//    
//}
-(instancetype)initWithFrame:(CGRect)farame withTitle:(NSString *)title withContent:(NSString *)content
{
    if (self = [super initWithFrame:farame]) {
        _title = title;
        _content = content;
        //self.backgroundColor = [UIColor redColor];
        [self setupUI];
    }
    return self;
}

-(void)setupUI
{
    // 圆
    NSInteger width = self.bounds.size.width / 2;
    UIView *view = [[UIView alloc]initWithFrame:self.bounds];
    view.layer.cornerRadius = width;
    view.layer.masksToBounds = YES;
    view.backgroundColor = [UIColor lightGrayColor];
    [self addSubview:view];
    // label
    UILabel *label = [[UILabel alloc]init];
    label.frame = CGRectMake(0, 0, 100, 20);
    label.text = self.title;
    [self addSubview:label];
    //self.label = label;
//    [label mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.top.equalTo(self).offset(20);
//        make.left.equalTo(self).offset(20);
//    }];
    
    
}

//-(void)layoutSubviews
//{
//    [super layoutSubviews];
//    [_label mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.top.equalTo(self).offset(20);
//        make.left.equalTo(self).offset(20);
//    }];
//    
//    
//    
//}

@end
