//
//  WYNavigationBarView.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYNavBarView.h"

@implementation WYNavBarView

+(instancetype)navBarView
{
    
    return [[[NSBundle mainBundle] loadNibNamed:@"WYNavBarView" owner:nil options:nil] lastObject];
}



@end
