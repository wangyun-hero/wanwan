//
//  HomePageViewController.m
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright © 2017年 Yonyou. All rights reserved.
//
static NSString *homeCellid = @"homeCellid";
#import "HomePageViewController.h"
#import "WYHomeCollectinViewFlowLayout.h"
#import "WYHomeCollectionViewCell.h"
#import "WYButton.h"
#import "WYFuncView.h"
#import "WYFunctionViewController.h"
#import "WYNavBarView.h"
#import "SDCycleScrollView.h"
#import <Summer/Summer.h>
@interface HomePageViewController ()<SDCycleScrollViewDelegate>
@end

@implementation HomePageViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupUI];
}

-(void)setupUI
{
   


    
    // 顶部装轮播view
    UIView *cicyleview = [[UIView alloc]init];
    cicyleview.backgroundColor = [UIColor redColor];
    [self.view addSubview:cicyleview];
    
    SDCycleScrollView *cycleScrollView = [SDCycleScrollView cycleScrollViewWithFrame:CGRectMake(0, 0, SCREENWIDTH, 250) delegate:self placeholderImage:[UIImage imageNamed:@"h1"]];
    cycleScrollView.localizationImageNamesGroup = @[@"index_banner1",@"index_banner2",@"index_banner3"];
    cycleScrollView.autoScrollTimeInterval = 1;
    cycleScrollView.pageControlAliment = SDCycleScrollViewPageContolAlimentCenter;
    [cicyleview addSubview:cycleScrollView];
    
    
    // 本地加载图片的轮播器
//    SDCycleScrollView *cycleScrollView = [SDCycleScrollView cycleScrollViewWithFrame: imagesGroup:图片数组];
    
    
    [cicyleview mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view).offset(0);
        make.left.equalTo(self.view).offset(0);
        make.right.equalTo(self.view).offset(0);
        make.height.offset(250);
        
    }];
    
    // 中间放button的view
    UIView *btnView = [[UIView alloc]init];
    btnView.backgroundColor = BASE_COLOUR;
    [self.view addSubview:btnView];
    NSInteger p = SCREENWIDTH / 3;
    [btnView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(cicyleview.mas_bottom).offset(0);
        make.left.equalTo(self.view).offset(0);
        make.right.equalTo(self.view).offset(0);
        make.height.offset(p);
    }];
    // 政策法规 机构电话 通关参数
    WYButton *firstBtn = [self creatBtnWithTitle:@"政策法规" image:@"政策法规"];
    [firstBtn addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchUpInside];
    firstBtn.tag = 1;
    [btnView addSubview:firstBtn];
    
    [firstBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(btnView).offset(0);
        make.left.equalTo(btnView).offset(0);
        make.width.offset(p);
        make.height.offset(p);
    }];
    
    WYButton *secondBtn = [self creatBtnWithTitle:@"通关参数" image:@"通关参数"];
    [secondBtn addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchUpInside];
    [btnView addSubview:secondBtn];
    secondBtn.tag = 2;
    
    [secondBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(btnView).offset(0);
        make.left.equalTo(firstBtn.mas_right).offset(0);
        make.width.offset(p);
        make.height.offset(p);
    }];
    
    WYButton *thirdBtn = [self creatBtnWithTitle:@"机构电话" image:@"机构电话"];
    [thirdBtn addTarget:self action:@selector(btnClick:) forControlEvents:UIControlEventTouchUpInside];
    [btnView addSubview:thirdBtn];
    thirdBtn.tag = 3;
    
    [thirdBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(btnView).offset(0);
        make.right.equalTo(btnView).offset(0);
        make.width.offset(p);
        make.height.offset(p);
    }];
    
    
    
    // 底部的view
    WYFuncView *firstFuntionView = [self creatViewWithColour:[UIColor colorWithRed:250/255.0 green:197/255.0 blue:156/255.0 alpha:1]];
    firstFuntionView.titleText.text = @"总署概况";
    firstFuntionView.stateText.text = @"海关总署领导,组织职责介绍";
//    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(viewClick:)];
//    [firstFuntionView addGestureRecognizer:tap];
    // 第一个
    [firstFuntionView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(btnView.mas_bottom).offset(0);
        make.left.equalTo(self.view).offset(10);
        make.width.offset(190);
        make.height.offset(90);
    }];
    
    // 第二个
    WYFuncView *secondFuntionView = [self creatViewWithColour:[UIColor colorWithRed:199/255.0 green:217/255.0 blue:240/255.0 alpha:1]];
    secondFuntionView.titleText.text = @"各关导航";
    secondFuntionView.stateText.text = @"海关总署下属直属海关等机构简介";
    [secondFuntionView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(btnView.mas_bottom).offset(0);
        make.left.equalTo(firstFuntionView.mas_right).offset(10);
        make.width.offset(190);
        make.height.offset(90);
    }];
    
    // 第三个
    WYFuncView *thirdFuntionView = [self creatViewWithColour:[UIColor colorWithRed:195/255.0 green:213/255.0 blue:158/255.0 alpha:1]];
    thirdFuntionView.titleText.text = @"通关导航";
    thirdFuntionView.stateText.text = @"通关流程动画演示";
    [thirdFuntionView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(firstFuntionView.mas_bottom).offset(10);
        make.left.equalTo(self.view).offset(10);
        make.width.offset(190);
        make.height.offset(90);
    }];
    
    // 第四个
    WYFuncView *fourthFuntionView = [self creatViewWithColour:[UIColor colorWithRed:255/255.0 green:254/255.0 blue:159/255.0 alpha:1]];
    fourthFuntionView.titleText.text = @"今日海关";
    fourthFuntionView.stateText.text = @"海关新闻资讯";

    [fourthFuntionView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(secondFuntionView.mas_bottom).offset(10);
        make.left.equalTo(thirdFuntionView.mas_right).offset(10);
        make.width.offset(190);
        make.height.offset(90);
    }];
    
    // 第五个
    WYFuncView *fifFuntionView = [self creatViewWithColour:[UIColor colorWithRed:154/255.0 green:208/255.0 blue:222/255.0 alpha:1]];
    fifFuntionView.titleText.text = @"统计快报";
    fifFuntionView.stateText.text = @"海关权威统计数据发布";
    [fifFuntionView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(thirdFuntionView.mas_bottom).offset(10);
        make.left.equalTo(self.view).offset(10);
        make.width.offset(190);
        make.height.offset(90);
    }];
    
    // 第六个
    WYFuncView *sixFuntionView = [self creatViewWithColour:[UIColor colorWithRed:179/255.0 green:163/255.0 blue:198/255.0 alpha:1]];
    sixFuntionView.titleText.text = @"在线访谈";
    sixFuntionView.stateText.text = @"海关权威人士热点解读";
    [sixFuntionView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(fourthFuntionView.mas_bottom).offset(10);
        make.left.equalTo(fifFuntionView.mas_right).offset(10);
        make.width.offset(190);
        make.height.offset(90);
    }];
    
    WYNavBarView *navBarView = [[WYNavBarView alloc]initWithFrame:CGRectMake(0, 375, SCREENWIDTH, 64)];
    [self.view addSubview:navBarView];

}

#pragma mark -功能列表点击
-(void)viewClick:(UITapGestureRecognizer *)sender
{
    NSLog(@"view被点击");
    WYFunctionViewController *vc = [[WYFunctionViewController alloc]init];
    vc.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:vc animated:YES];
    
}

#pragma mark -按钮点击
-(void)btnClick:(WYButton *)sender
{
    NSDictionary *params;
    switch (sender.tag) {
        case 1:
            params = @{
                       @"wwwFolderName": @"apps/ttt/www",
                       @"startPage": @"html/main/zhengcefagui/zhengcefagui.html",
                       @"id": @"ttt"
                       };
            break;
            
        case 2:
            params = @{
                       @"wwwFolderName": @"apps/ttt/www",
                       @"startPage": @"html/main/tongguancanshu/tongguancanshu.html",
                       @"id": @"ttt"
                       };
            break;
            
        case 3:
            params = @{
                       @"wwwFolderName": @"apps/ttt/www",
                       @"startPage": @"html/main/jigoudianhua/jigoudianhua.html",
                       @"id": @"ttt"
                       };
            break;
    }
    UIViewController *vc = [[SummerInterface sharedInstance] viewControllerWithParams:params];
//    WYFunctionViewController *funVC = [[WYFunctionViewController alloc]init];
    vc.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:vc animated:YES];
}

#pragma mark -创建功能view
-(WYFuncView *)creatViewWithColour:(UIColor *)colour
{
    WYFuncView *funtionView = [WYFuncView functionView];
    [self.view addSubview:funtionView];
    funtionView.layer.borderWidth = 2;
    funtionView.layer.borderColor = [colour CGColor];
    funtionView.layer.cornerRadius = 10;
    funtionView.layer.masksToBounds = YES;
    [funtionView addTarget:self action:@selector(viewClick:) forControlEvents:UIControlEventTouchUpInside];
    return funtionView;
}

#pragma mark -创建按钮
-(WYButton *)creatBtnWithTitle:(NSString *)title image:(NSString *)image
{
    WYButton *btn = [[WYButton alloc]init];
    
    [btn setImage:[UIImage imageNamed:image] forState:UIControlStateNormal];
    [btn setTitle:title forState:UIControlStateNormal];
    [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    
    
    return btn;
}

//-(NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
//{
//    return 3;
//}

//- (NSInteger)collectionView:(UICollectionView*)collectionView numberOfItemsInSection:(NSInteger)section
//{
//    return 40;
//}
//
//- (UICollectionViewCell*)collectionView:(UICollectionView*)collectionView cellForItemAtIndexPath:(NSIndexPath*)indexPath
//{
//    WYHomeCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:homeCellid forIndexPath:indexPath];
//    
//    // 设置随机颜色 测试
//    cell.backgroundColor = [UIColor randomColor];
//    
//    return cell;
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
