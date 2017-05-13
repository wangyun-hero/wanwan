//
//  WYFunctionView.h
//  TemplateProject
//
//  Created by 王云 on 17/5/11.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface WYFuncView : UIControl
@property (weak, nonatomic) IBOutlet UILabel *titleText;

@property (weak, nonatomic) IBOutlet UILabel *stateText;

+(instancetype)functionView;
@end
