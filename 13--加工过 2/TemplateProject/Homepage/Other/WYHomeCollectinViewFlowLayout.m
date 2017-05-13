//
//  WYHomeCollectinViewFlowLayout.m
//  TemplateProject
//
//  Created by 王云 on 17/5/11.
//  Copyright © 2017年 Yonyou. All rights reserved.
//

#import "WYHomeCollectinViewFlowLayout.h"

@implementation WYHomeCollectinViewFlowLayout

-(void)prepareLayout
{
    [super prepareLayout];
    CGFloat w = ((self.collectionView.bounds.size.width -40)/ 2);
    //    CGFloat h = self.collectionView.bounds.size.height / 2;
    self.itemSize = CGSizeMake(w, 60); // cell大小
    self.minimumLineSpacing = 10; // 行间距
    self.minimumInteritemSpacing = 30; // cell间距
    
    self.scrollDirection = UICollectionViewScrollDirectionVertical; // 设置水平滑动

}

@end
