//
//  WYCirclerView.h
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface WYCirclerView : UIView
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;

@property (weak, nonatomic) IBOutlet UIView *secondView;

-(void)topIconHidden:(BOOL)hidden;
-(void)bottomIconHidden:(BOOL)hidden;
+(instancetype)circlerView;

@end
