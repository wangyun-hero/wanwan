//
//  WYServiceCenterFlowLayout.m
//  TemplateProject
//
//  Created by 王云 on 17/5/11.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYServiceCenterFlowLayout.h"

@implementation WYServiceCenterFlowLayout

- (void)prepareLayout
{
    [super prepareLayout];
    
    CGFloat w = self.collectionView.bounds.size.width / 3;
    //    CGFloat h = self.collectionView.bounds.size.height / 2;
    self.itemSize = CGSizeMake(w, w); // cell大小
    self.minimumLineSpacing = 10; // 行间距
    self.minimumInteritemSpacing = 0; // cell间距
    
    self.scrollDirection = UICollectionViewScrollDirectionVertical; // 设置水平滑动
}


@end
