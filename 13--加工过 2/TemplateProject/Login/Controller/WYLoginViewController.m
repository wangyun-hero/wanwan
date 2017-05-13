//
//  WYLoginViewController.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYLoginViewController.h"
#import "WYRegisterViewController.h"
@interface WYLoginViewController ()
@property (weak, nonatomic) IBOutlet UITextField *userNameTextField;
@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;
@property (weak, nonatomic) IBOutlet UITextField *codeTextField;


@end

@implementation WYLoginViewController
//-(void)viewWillDisappear:(BOOL)animated
//{
//    [super viewWillDisappear:animated];
//    self.navigationItem.titleView = nil;
//}
- (IBAction)vistorLogin:(id)sender
{
    [[CIUserManagerShared sharedInstance] homeViewController];
}
- (IBAction)registButton:(id)sender {
    WYRegisterViewController *vc = [[WYRegisterViewController alloc]init];
    
    [self.navigationController pushViewController:vc animated:YES];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationController.navigationBar.hidden = YES;
        [self setupUI];
    
}


-(void)setupUI
{
    // 用户名
    [self changeColour:self.userNameTextField];
    [self changeColour:self.passwordTextField];
    [self changeColour:self.codeTextField];
    
}

#pragma mark -更改textfield的边框样式以及占位字体颜色
-(void)changeColour:(UITextField *)textField
{
    textField.layer.borderWidth = 1;
    textField.layer.borderColor = [[UIColor whiteColor] CGColor];
    
    [textField setValue:[UIColor whiteColor] forKeyPath:@"_placeholderLabel.textColor"];
    [[UITextField appearance] setTintColor:[UIColor whiteColor]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
