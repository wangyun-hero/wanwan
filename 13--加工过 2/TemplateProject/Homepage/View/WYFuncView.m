//
//  WYFunctionView.m
//  TemplateProject
//
//  Created by 王云 on 17/5/11.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYFuncView.h"

@implementation WYFuncView

+(instancetype)functionView
{
    
    return [[[NSBundle mainBundle] loadNibNamed:@"WYFuncView" owner:nil options:nil] lastObject];
}

@end
