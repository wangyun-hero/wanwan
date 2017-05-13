//
//  WYCollectionViewFlowLayout.m
//  TemplateProject
//
//  Created by 王云 on 17/5/10.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYCollectionViewFlowLayout.h"

@implementation WYCollectionViewFlowLayout

// 这个方法在调用的时候 一定准备好了 collectionView
// 并不是在创建完布局的时候就调用
- (void)prepareLayout
{
    // 一定要去调用父类方法
    [super prepareLayout];
    
    CGFloat w = self.collectionView.bounds.size.width / 3;
//    CGFloat h = self.collectionView.bounds.size.height / 2;
    self.itemSize = CGSizeMake(w, w); // cell大小
    self.minimumLineSpacing = 10; // 行间距
    self.minimumInteritemSpacing = 0; // cell间距
    
    self.scrollDirection = UICollectionViewScrollDirectionVertical; // 设置水平滑动
}


@end
