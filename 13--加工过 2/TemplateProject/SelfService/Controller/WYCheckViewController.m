//
//  WYCheckViewController.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//
static NSString *cellid = @"cellid";
#import "WYCheckViewController.h"
#import "WYCollectionViewFlowLayout.h"
#import "WYCollectionViewCell.h"
#import "WYTestViewController.h"
#import "WYLoginViewController.h"
#import "WYRegisterViewController.h"
@interface WYCheckViewController ()<UICollectionViewDelegate,UICollectionViewDataSource,UIScrollViewDelegate>
@property(nonatomic,strong) UIScrollView *scrollView;
@property(nonatomic,strong) UICollectionView *collectionView;
@property(nonatomic,strong) UICollectionView *rightCollectionView;
@property(nonatomic,strong) UISegmentedControl *segment;
@end

@implementation WYCheckViewController

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [self.collectionView mas_remakeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view).offset(164);
        make.left.equalTo(self.view).offset(0);
        make.right.equalTo(self.view).offset(0);
        make.bottom.equalTo(self.view).offset(0);
    }];
    [self.view layoutIfNeeded];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"我要查";
    [self setupUI];
    
}
#pragma mark -布局
-(void)setupUI
{
    NSArray *arr = [[NSArray alloc]initWithObjects:@"个人",@"企业", nil];
    UISegmentedControl *segment = [[UISegmentedControl alloc]initWithItems:arr];
    segment.frame = CGRectMake(120, 94, 200, 40);
    segment.selectedSegmentIndex = 0;
    self.segment = segment;
    [segment addTarget:self action:@selector(segmentClick:) forControlEvents:UIControlEventValueChanged];
    [self.view addSubview:segment];
    
    
    
    
    
    WYCollectionViewFlowLayout *flowlayout = [[WYCollectionViewFlowLayout alloc]init];
    UICollectionView *collectionView = [[UICollectionView alloc]initWithFrame:CGRectZero collectionViewLayout:flowlayout];
    // 右边collectionview
    UICollectionView *rightCollectionView = [[UICollectionView alloc]initWithFrame:CGRectZero collectionViewLayout:flowlayout];
    self.collectionView = collectionView;
    self.rightCollectionView = rightCollectionView;
    [rightCollectionView registerNib:[UINib nibWithNibName:@"WYCollectionViewCell" bundle:nil] forCellWithReuseIdentifier:cellid];
    [collectionView registerNib:[UINib nibWithNibName:@"WYCollectionViewCell" bundle:nil] forCellWithReuseIdentifier:cellid];
    // 取消指示器(滚动条)
    collectionView.showsVerticalScrollIndicator = false;
    collectionView.showsHorizontalScrollIndicator = NO;
    collectionView.pagingEnabled = YES;
    rightCollectionView.showsVerticalScrollIndicator = false;
    rightCollectionView.showsHorizontalScrollIndicator = NO;
    rightCollectionView.pagingEnabled = YES;
    
    // 设置背景颜色
    collectionView.backgroundColor = BASE_COLOUR;
    rightCollectionView.backgroundColor = BASE_COLOUR;
    // 设置数据源
    collectionView.dataSource = self;
    collectionView.delegate = self;
    rightCollectionView.delegate = self;
    rightCollectionView.dataSource = self;
    // 添加视图
    [self.view addSubview:collectionView];
    [self.view addSubview:rightCollectionView];
    
    
    // 底部的scrollview
//    UIScrollView *scrollView = [[UIScrollView alloc]initWithFrame:CGRectMake(0, 164, SCREENWIDTH, SCREENHEIGHT - 164)];
//    scrollView.pagingEnabled = YES;
//    scrollView.showsHorizontalScrollIndicator = NO;
//    [self.scrollView scrollRectToVisible:CGRectMake(0, 164, SCREENWIDTH, SCREENHEIGHT-164) animated:NO];
//    scrollView.contentSize = CGSizeMake(SCREENWIDTH * 2, SCREENHEIGHT-164);
//    scrollView.delegate = self;
//    [self.view addSubview:scrollView];
//    self.scrollView = scrollView;
//    [scrollView addSubview:collectionView];
//    [scrollView addSubview:rightCollectionView];
}

-(void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
    // 设置自动布局
    [self.collectionView mas_makeConstraints:^(MASConstraintMaker* make) {
        make.top.equalTo(self.view).offset(164);
        make.left.equalTo(self.view).offset(0);
        make.right.equalTo(self.view).offset(0);
        make.bottom.equalTo(self.view).offset(0);
    }];
    
    [self.rightCollectionView mas_makeConstraints:^(MASConstraintMaker* make) {
        make.top.equalTo(self.view).offset(164);
        make.left.equalTo(self.collectionView.mas_right).offset(0);
        make.right.equalTo(self.collectionView).offset(SCREENWIDTH);
        make.bottom.equalTo(self.view).offset(0);
    }];
    [self.view layoutIfNeeded];
}

#pragma mark -segment点击
-(void)segmentClick:(UISegmentedControl *)sender
{
    switch (sender.selectedSegmentIndex) {
        case 0:
        {
            NSLog(@"0000000000000");
//            [self.scrollView scrollRectToVisible:CGRectMake(-SCREENWIDTH, 164, SCREENWIDTH, SCREENHEIGHT - 164) animated:YES];
            [UIView animateWithDuration:.5 animations:^{
                [self.collectionView mas_remakeConstraints:^(MASConstraintMaker *make) {
                    make.top.equalTo(self.view).offset(164);
                    make.left.equalTo(self.view).offset(0);
                    make.right.equalTo(self.view).offset(0);
                    make.bottom.equalTo(self.view).offset(0);
                }];
                [self.view layoutIfNeeded];
            }];
        }
            break;
        case 1:
        {
            NSLog(@"1111111111111");
            [UIView animateWithDuration:.4 animations:^{
                [self.collectionView mas_updateConstraints:^(MASConstraintMaker *make) {
                    make.top.equalTo(self.view).offset(164);
                    make.left.equalTo(self.view).offset(-SCREENWIDTH);
                    make.right.equalTo(self.view.mas_left).offset(0);
                    make.bottom.equalTo(self.view).offset(0);
                }];
                [self.view layoutIfNeeded];
            }];
//            [self.scrollView setContentOffset:CGPointMake(164, SCREENHEIGHT)];
        }
            break;
        
    }
}



#pragma mark -数据源
- (NSInteger)collectionView:(UICollectionView*)collectionView numberOfItemsInSection:(NSInteger)section
{
    return 20;
}

- (UICollectionViewCell*)collectionView:(UICollectionView*)collectionView cellForItemAtIndexPath:(NSIndexPath*)indexPath
{
    WYCollectionViewCell* cell = [collectionView dequeueReusableCellWithReuseIdentifier:cellid forIndexPath:indexPath];
    
    // 设置随机颜色 测试
    //cell.backgroundColor = [UIColor randomColor];
    
    return cell;
}

#pragma mark -代理
-(void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    if (collectionView == self.collectionView) {
        NSLog(@"点击了collectionView,实现跳转逻辑");
//        WYLoginViewController *vc = [[WYLoginViewController alloc]init];
//        [self.navigationController pushViewController:vc animated:YES];
    }else
    {
        NSLog(@"点击了rightcollectionView,实现跳转逻辑");
        WYTestViewController *vc = [[WYTestViewController alloc]init];
        [self.navigationController pushViewController:vc animated:YES];
    }
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    
}


@end
