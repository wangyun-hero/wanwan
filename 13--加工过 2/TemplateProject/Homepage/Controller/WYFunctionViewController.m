//
//  WYFunctionViewController.m
//  TemplateProject
//
//  Created by 王云 on 17/5/11.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYFunctionViewController.h"

@interface WYFunctionViewController ()

@end

@implementation WYFunctionViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIWebView *webView = [[UIWebView alloc]initWithFrame:CGRectMake(0, 0, SCREENWIDTH, SCREENHEIGHT)];
    [self.view addSubview:webView];
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://www.baidu.com"]]];
//    [self setupUI];
    
    // Do any additional setup after loading the view.
}

-(void)setupUI
{
    UIWebView *webView = [[UIWebView alloc]initWithFrame:CGRectMake(0, 100, SCREENWIDTH, 400)];
    webView.backgroundColor = [UIColor redColor];
    [self.view addSubview:webView];
//    [webView mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.top.equalTo(self.view).offset(0);
//    }];
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
