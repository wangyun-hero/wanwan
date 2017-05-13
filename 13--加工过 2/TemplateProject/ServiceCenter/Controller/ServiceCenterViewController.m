//
//  ServiceCenterViewController.m
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright ©2017年 Yonyou. All rights reserved.
//
static NSString *serviceCellid = @"serviceCellid";
#import "ServiceCenterViewController.h"
#import "WYServiceCenterFlowLayout.h"
@interface ServiceCenterViewController ()<UICollectionViewDelegate,UICollectionViewDataSource>

@end

@implementation ServiceCenterViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupUI];
}

-(void)setupUI
{
    WYServiceCenterFlowLayout * flowlayout = [[WYServiceCenterFlowLayout alloc]init];
    UICollectionView *collectionView = [[UICollectionView alloc]initWithFrame:CGRectMake(0, 0, SCREENWIDTH, SCREENHEIGHT) collectionViewLayout:flowlayout];
    collectionView.dataSource = self;
    collectionView.delegate = self;
    collectionView.showsVerticalScrollIndicator = false;
    collectionView.showsHorizontalScrollIndicator = NO;
    collectionView.pagingEnabled = YES;
    collectionView.backgroundColor = BASE_COLOUR;
    // 注册cell
    [collectionView registerNib:[UINib nibWithNibName:@"WYServiceCell" bundle:nil] forCellWithReuseIdentifier:serviceCellid];
    [self.view addSubview:collectionView];
}

#pragma mark -数据源
- (NSInteger)collectionView:(UICollectionView*)collectionView numberOfItemsInSection:(NSInteger)section
{
    return 20;
}

- (UICollectionViewCell*)collectionView:(UICollectionView*)collectionView cellForItemAtIndexPath:(NSIndexPath*)indexPath
{
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:serviceCellid forIndexPath:indexPath];
    
    // 设置随机颜色 测试
    //cell.backgroundColor = [UIColor randomColor];
    
    return cell;
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
