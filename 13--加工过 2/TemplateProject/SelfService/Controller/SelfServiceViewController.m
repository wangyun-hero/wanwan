//
//  SelfServiceViewController.m
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "SelfServiceViewController.h"
#import "ContentView.h"
#import "WYCirclerView.h"
//#import "Masonry.h"
#import "WYCheckViewController.h"
@interface SelfServiceViewController ()
@property(nonatomic,strong) UIView *topView;
@property(nonatomic,strong) UIView *bottomView;
@end

@implementation SelfServiceViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupUI];
//    ContentView *view = [[ContentView alloc]initWithFrame:CGRectMake(100, 100, 200, 200) withTitle:@"来吧来吧" withContent:@"来吧来吧"];
//    [self.view addSubview:view];
    
    
    
}

-(void)setupUI
{
    WYCirclerView *circlerViewTop = [WYCirclerView circlerView];
    [self.view addSubview:circlerViewTop];
    self.topView = circlerViewTop;
    // 手势
    UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(topClick:)];
    [circlerViewTop addGestureRecognizer:tapGesture];
    circlerViewTop.titleLabel.text = @"我要查";
    circlerViewTop.titleLabel.textColor = LIGHT_BLUE_COLOUR;
    [circlerViewTop bottomIconHidden:YES];
    // 圆角
    circlerViewTop.secondView.layer.cornerRadius = 75;
    circlerViewTop.secondView.layer.masksToBounds = YES;
    circlerViewTop.secondView.layer.borderColor = [LIGHT_BLUE_COLOUR CGColor];
    circlerViewTop.secondView.layer.borderWidth = 4;
    
    // 布局
    [circlerViewTop mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view).offset(150);
        make.left.equalTo(self.view).offset(375/2 -55);
        make.height.offset(150);
        make.width.offset(150);
    }];
    
    // 底部的view
    WYCirclerView *circlerViewBottom = [WYCirclerView circlerView];
    self.bottomView = circlerViewBottom;
    [self.view addSubview:circlerViewBottom];
    UITapGestureRecognizer *tapGestureBottom = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(bottomClick:)];
    [circlerViewBottom addGestureRecognizer:tapGestureBottom];
    circlerViewBottom.titleLabel.text = @"我要办";
    circlerViewBottom.titleLabel.textColor = GREEN_COLOUR;
    [circlerViewBottom topIconHidden:YES];
    circlerViewBottom.secondView.layer.cornerRadius = 75;
    circlerViewBottom.secondView.layer.masksToBounds = YES;
    circlerViewBottom.secondView.layer.borderColor = [GREEN_COLOUR CGColor];
    circlerViewBottom.secondView.layer.borderWidth = 4;
    [circlerViewBottom mas_makeConstraints:^(MASConstraintMaker *make) {
        make.bottom.equalTo(self.view).offset(-150);
        make.left.equalTo(self.view).offset(375/2 -55);
        make.height.offset(150);
        make.width.offset(150);
    }];
    
    
//    UIView *view = [[UIView alloc]initWithFrame:CGRectMake(180, 0, 50, 40)];
//    view.backgroundColor = [UIColor redColor];
//    [self.navigationController.navigationBar addSubview:view];
}
#pragma mark -顶部view手势
-(void)topClick:(UITapGestureRecognizer *)sender
{
    CGPoint p1 = [sender locationInView:self.view];
    CGPoint p2 = self.topView.center;
    NSInteger m1 = p1.x;
    NSInteger m2 = p1.y;
    NSInteger n1 = p2.x;
    NSInteger n2 = p2.y;
    NSInteger mm = pow(labs(m1 - n1), 2) + pow(labs(m2 - n2), 2);
    NSUInteger o = sqrt(mm);
    if (o > 50) {
        return;
    }else
    {
        WYCheckViewController *vc = [[WYCheckViewController alloc]init];
        [vc setHidesBottomBarWhenPushed:YES];
        [self.navigationController pushViewController:vc animated:YES];
    }
}

#pragma mark -底部view的手势
-(void)bottomClick:(UITapGestureRecognizer *)sender
{
    CGPoint p1 = [sender locationInView:self.view];
    CGPoint p2 = self.bottomView.center;
    NSInteger m1 = p1.x;
    NSInteger m2 = p1.y;
    NSInteger n1 = p2.x;
    NSInteger n2 = p2.y;
    NSInteger mm = pow(labs(m1 - n1), 2) + pow(labs(m2 - n2), 2);
    NSUInteger o = sqrt(mm);
    if (o > 50) {
        return;
    }else
    {
        WYCheckViewController *vc = [[WYCheckViewController alloc]init];
        [vc setHidesBottomBarWhenPushed:YES];
        [self.navigationController pushViewController:vc animated:YES];
    }
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
