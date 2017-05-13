//
//  MineViewController.m
//  TemplateProject
//
//  Created by hai on 2017/5/9.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "MineViewController.h"
#import "MineModel.h"
#import "WYLoginViewController.h"
#define WIDTH self.view.bounds.size.width
#define HEIGHT self.view.bounds.size.height
static NSString *cellID = @"cellID";
@interface MineViewController () <UITableViewDelegate,UITableViewDataSource>

@property(nonatomic,strong)NSMutableArray *array;

@end

@implementation MineViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initData];
    [self setupUI];
    

}

-(NSMutableArray *)array
{
    if (!_array) {
        _array = [NSMutableArray array];
    }
    return _array;
}

-(void)setupUI
{
    UIView *view = [[UIView alloc]initWithFrame:CGRectMake(0, 0, WIDTH, 200)];
    
    UIImageView *imageView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"背景图片2"]];
    imageView.frame = view.frame;
    [view addSubview:imageView];
    
    UITableView *tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
    [self.view addSubview:tableView];
    tableView.tableHeaderView = view;
    tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    tableView.scrollEnabled = false;
    tableView.backgroundColor = [UIColor colorWithRed:242/255.0 green:242/255.0 blue:242/255.0 alpha:1];
    [tableView registerClass:[UITableViewCell class] forCellReuseIdentifier:cellID];
    tableView.delegate = self;
    tableView.dataSource = self;

}

-(void)initData
{
    MineModel *model1 = [[MineModel alloc]init];
    model1.icon = @"我的资料";
    model1.content = @"我的资料";
    [self.array addObject:model1];
    
    MineModel *model2 = [[MineModel alloc]init];
    model2.icon = @"首页快捷1";
    model2.content = @"首页快捷";
    [self.array addObject:model2];
    
    MineModel *model3 = [[MineModel alloc]init];
    model3.icon = @"我的收藏";
    model3.content = @"我的收藏";
    [self.array addObject:model3];
    
    MineModel *model4 = [[MineModel alloc]init];
    model4.icon = @"我的订阅";
    model4.content = @"我的订阅";
    [self.array addObject:model4];
    
    MineModel *model5 = [[MineModel alloc]init];
    model5.icon = @"应用设置";
    model5.content = @"应用设置";
    [self.array addObject:model5];
}

//-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
//{
//    return 1;
//}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 5;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID forIndexPath:indexPath];
    cell.semanticContentAttribute = UISemanticContentAttributeForceLeftToRight;
    MineModel *model = self.array[indexPath.row];
    cell.imageView.image = [UIImage imageNamed:model.icon];
    cell.textLabel.text = model.content;
    //cell.backgroundColor = [UIColor redColor];
    return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    WYLoginViewController *vc = [[WYLoginViewController alloc]init];
    vc.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:vc animated:YES];
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
