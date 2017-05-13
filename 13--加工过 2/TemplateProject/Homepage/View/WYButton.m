//
//  WYButton.m
//  TemplateProject
//
//  Created by 王云 on 17/5/11.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYButton.h"

@implementation WYButton

-(void)layoutSubviews
{
    [super layoutSubviews];
    CGFloat midX = (self.frame.size.width / 2)  ;
    CGFloat midY = (self.frame.size.height/ 2) ;
    self.titleLabel.center = CGPointMake(midX, midY + 30);
    self.imageView.center = CGPointMake(midX, midY - 15);
    
}

@end
