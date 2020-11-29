import request from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    data: {
      iid: iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommmed'
  })
}

export class Goods { 
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.iid = itemInfo.iid
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class Sku {
  constructor(skuInfo) {
    this.price = skuInfo.defaultPrice
    this.color = skuInfo.props[0].list
    this.sizes = skuInfo.props[1].list
    this.skus = skuInfo.skus
  }
}