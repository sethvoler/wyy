export default {
  /**
   * 调用此接口, 可获取精品歌单
   * 
   * 可选参数: 
   * 1.cat: 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 
   *   默认为 "全部", 可从歌单分类接口获取(/ playlist / catlist)
   * 2. limit: 取出歌单数量, 默认为 20
   * 3. before: 分页参数, 取上一页最后一个歌单的 updateTime 获取下一页数据
   * 
   * 调用例子: 
   *   http://localhost:3000/top/playlist/highquality
   *     ?before=1503639064232&limit=3
   */
  playlist: '/top/playlist/highquality',
}