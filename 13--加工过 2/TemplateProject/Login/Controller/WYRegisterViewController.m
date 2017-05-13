//
//  WYRegisterViewController.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYRegisterViewController.h"
#import "CIUserManagerShared.h"
@interface WYRegisterViewController ()
@property (weak, nonatomic) IBOutlet UIButton *getCodeButton;

@end

@implementation WYRegisterViewController

- (void)viewWillAppear:(BOOL)animated
{
    
    [super viewWillAppear:animated];
    if (self.navigationController.navigationBar.hidden == true) {
        self.navigationController.navigationBar.hidden = false;
    }
    
    
}

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    if (self.navigationController.navigationBar.hidden == false) {
        self.navigationController.navigationBar.hidden = true;
    }
    
}
// 获取验证码
- (IBAction)getCode:(id)sender
{
    [self openCountdown];
}
- (IBAction)registBtnClick:(id)sender {
    
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"注册";
    
    // Do any additional setup after loading the view from its nib.
}

// 开启倒计时效果
-(void)openCountdown{
    
    __block NSInteger time = 59; //倒计时时间
    
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_source_t _timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, queue);
    
    dispatch_source_set_timer(_timer,dispatch_walltime(NULL, 0),1.0*NSEC_PER_SEC, 0); //每秒执行
    
    dispatch_source_set_event_handler(_timer, ^{
        
        if(time <= 0){ //倒计时结束，关闭
            
            dispatch_source_cancel(_timer);
            dispatch_async(dispatch_get_main_queue(), ^{
                
                //设置按钮的样式
                [self.getCodeButton setTitle:@"重新发送" forState:UIControlStateNormal];
                [self.getCodeButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
                self.getCodeButton.userInteractionEnabled = YES;
            });
            
        }else{
            
            int seconds = time % 60;
            dispatch_async(dispatch_get_main_queue(), ^{
                
                //设置按钮显示读秒效果
                [self.getCodeButton setTitle:[NSString stringWithFormat:@"重新发送(%.2d)", seconds] forState:UIControlStateNormal];
                [self.getCodeButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
                self.getCodeButton.userInteractionEnabled = NO;
            });
            time--;
        }
    });
    dispatch_resume(_timer);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
