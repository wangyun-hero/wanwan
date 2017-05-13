//
//  WYBaseViewController.m
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYBaseViewController.h"
//#import "SVProgressHUD.h"
#import "WYNavBarView.h"
@interface WYBaseViewController ()

@end

@implementation WYBaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = BASE_COLOUR;
    [self setupNavigationBarItem];
    
}

-(void)setupNavigationBarItem
{
//    if (self.navigationController.childViewControllers.count > 0) {
//        [self.navigationController.navigationBar setHidden:YES];
//        WYNavBarView *nav = [WYNavBarView navBarView];
//        nav.frame = CGRectMake(0, 0, SCREENWIDTH, 64);
//        [self.view addSubview:nav];
//    }else
//    {
//        [self.navigationController.navigationBar setTintColor:[UIColor whiteColor]];
//        // 设置返回按钮都是空字符串
//        self.navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
//        UIBarButtonItem *phoneItem = [UIBarButtonItem barBuutonItemWithTarget:self action:@selector(phoneClick) icon:@"top电话" highlighticon:@"top电话"];
//        UIBarButtonItem *messageItem = [UIBarButtonItem barBuutonItemWithTarget:self action:@selector(messageClick) icon:@"top消息" highlighticon:@"top消息"];
//        self.navigationItem.rightBarButtonItems = @[messageItem,phoneItem];
//    }
//
    [self.navigationController.navigationBar setTintColor:[UIColor whiteColor]];
            // 设置返回按钮都是空字符串
            self.navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
            UIBarButtonItem *phoneItem = [UIBarButtonItem barBuutonItemWithTarget:self action:@selector(phoneClick) icon:@"top电话" highlighticon:@"top电话"];
            UIBarButtonItem *messageItem = [UIBarButtonItem barBuutonItemWithTarget:self action:@selector(messageClick) icon:@"top消息" highlighticon:@"top消息"];
            self.navigationItem.rightBarButtonItems = @[messageItem,phoneItem];
    
//    [self.navigationController.navigationBar setHidden:YES];
//    WYNavBarView *navBarView = [[WYNavBarView alloc]initWithFrame:CGRectMake(0, 0, SCREENWIDTH, 64)];
//    [self.view addSubview:navBarView];
//    UIImageView *imageView = [[UIImageView alloc]initWithFrame:CGRectMake(80, 40,320, 44)];
//     self.navigationController.navigationBar.translucent = NO;
//    self.navigationController.navigationBar.backgroundColor = [UIColor whiteColor];
//     self.navigationItem.hidesBackButton = YES;
//    imageView.image = [UIImage imageNamed:@"TOP"];
//    //view.backgroundColor = [UIColor redColor];
//    self.navigationItem.titleView = imageView;
    
    
}

#pragma mark -item点击
-(void)phoneClick
{
    NSLog(@"电话被点击了");
    [SVProgressHUD showSuccessWithStatus:@"电话被点击了"];
    //[SVProgressHUD showWithStatus:@"电话被点击了"];
}

-(void)messageClick
{
    NSLog(@"消息被点击了");
    [SVProgressHUD showSuccessWithStatus:@"消息被点击了"];
    //[SVProgressHUD showWithStatus:@"消息被点击了"];
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
