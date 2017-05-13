//
//  WYNavigationController.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYNavigationController.h"

@interface WYNavigationController ()

@end

@implementation WYNavigationController

-(void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{

    [super pushViewController:viewController animated:animated];
    
    
    
    
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    // Do any additional setup after loading the view.
}

//+ (void)initialize
//{
//    //1. 获取NavBar
//    UINavigationBar *navBar = [UINavigationBar appearance];
//    
//    //2. 直接修改背景图片
//    [navBar setBackgroundImage:[UIImage imageNamed:@"TOP"] forBarMetrics:UIBarMetricsDefault];
//    
////    [navBar setBackgroundColor:BLUE_COLOUR];
//    
//}

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
