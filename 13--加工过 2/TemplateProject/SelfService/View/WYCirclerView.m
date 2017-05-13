//
//  WYCirclerView.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYCirclerView.h"
@interface WYCirclerView()
@property (weak, nonatomic) IBOutlet UIImageView *topIcon;
@property (weak, nonatomic) IBOutlet UIImageView *bottomIcon;

@end
@implementation WYCirclerView
-(void)topIconHidden:(BOOL)hidden
{
    if (hidden == YES) {
        self.topIcon.hidden = YES;
    }else
    {
        self.topIcon.hidden = false;
    }
}

-(void)bottomIconHidden:(BOOL)hidden
{
    if (hidden == YES) {
        self.bottomIcon.hidden = YES;
    }else
    {
        self.bottomIcon.hidden = false;
    }
}

+(instancetype)circlerView
{
    
    return [[[NSBundle mainBundle] loadNibNamed:@"WYCirclerView" owner:nil options:nil] lastObject];
}


@end
