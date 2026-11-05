# REFUGEE — Art job manifest (sprite sheets)

Each sheet = ONE image, 4 columns × 3 rows grid, cell N counted left→right, top→bottom (1–4 top row, 5–8 middle, 9–12 bottom). Empty cells stay fully transparent.

For every object, `code_line` points to its current vector renderer in `game/index.html` (search for `<key>(t,T){`). Read it to see the shape, colours, size and any glow/animation, and look at `screenshots/mapNN_*.jpg` to see it in the game.

`count_on_map` = how many copies appear (high count = background filler, should look good repeated).


## sheet_01.png — ยอดหอดูดาวโอเรียน
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `obpine` | 36 ยอดหอดูดาวโอเรียน | 48 | 9030 |
| 2 | `obrock` | 36 ยอดหอดูดาวโอเรียน | 34 | 9033 |
| 3 | `obbush` | 36 ยอดหอดูดาวโอเรียน | 26 | 9890 |
| 4 | `obcry` | 36 ยอดหอดูดาวโอเรียน | 16 | 9036 |
| 5 | `obcairn` | 36 ยอดหอดูดาวโอเรียน | 9 | 9880 |
| 6 | `oblamp` | 36 ยอดหอดูดาวโอเรียน | 6 | 9038 |
| 7 | `obinst` | 36 ยอดหอดูดาวโอเรียน | 6 | 9884 |
| 8 | `obbox` | 36 ยอดหอดูดาวโอเรียน | 6 | 9887 |
| 9 | `obmir` | 36 ยอดหอดูดาวโอเรียน | 5 | 9015 |
| 10 | `obdome` | 36 ยอดหอดูดาวโอเรียน | 1 | 8990 |
| 11 | `obprism` | 36 ยอดหอดูดาวโอเรียน | 1 | 9006 |
| 12 | `obloom` | 36 ยอดหอดูดาวโอเรียน | 1 | 9008 |

## sheet_02.png — พระราชวังอัสตรา
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `pot` | 27 พระราชวังอัสตรา | 4 | 5609 |
| 2 | `mirf` | 27 พระราชวังอัสตรา | 4 | 5636 |
| 3 | `cand` | 27 พระราชวังอัสตรา | 4 | 5616 |
| 4 | `tban` | 27 พระราชวังอัสตรา | 3 | 5628 |
| 5 | `braz` | 27 พระราชวังอัสตรา | 2 | 5618 |
| 6 | `tel` | 27 พระราชวังอัสตรา | 2 | 5606 |
| 7 | `stump` | 27 พระราชวังอัสตรา | 2 | 5631 |
| 8 | `rack` | 27 พระราชวังอัสตรา | 2 | 5634 |
| 9 | `orr` | 27 พระราชวังอัสตรา | 1 | 5600 |
| 10 | `mirb` | 27 พระราชวังอัสตรา | 1 | 5640 |
| 11 | `globe` | 27 พระราชวังอัสตรา | 1 | 5612 |
| 12 | `dawn` | 27 พระราชวังอัสตรา | 1 | 5621 |

## sheet_03.png — ยอดหอดูดาวโอเรียน / สะพานรุ่งอรุณ
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `obstat` | 36 ยอดหอดูดาวโอเรียน | 1 | 9025 |
| 2 | `obskiff` | 36 ยอดหอดูดาวโอเรียน | 1 | 9040 |
| 3 | `blamp` | 30 สะพานรุ่งอรุณ | 18 | 6477 |
| 4 | `bpyl` | 30 สะพานรุ่งอรุณ | 8 | 6483 |
| 5 | `bban` | 30 สะพานรุ่งอรุณ | 6 | 6480 |
| 6 | `bshd` | 30 สะพานรุ่งอรุณ | 6 | 6509 |
| 7 | `barch` | 30 สะพานรุ่งอรุณ | 2 | 6502 |
| 8 | `btent` | 30 สะพานรุ่งอรุณ | 2 | 6487 |
| 9 | `bfire` | 30 สะพานรุ่งอรุณ | 1 | 6489 |
| 10 | `bcart` | 30 สะพานรุ่งอรุณ | 1 | 6492 |
| 11 | `bscope` | 30 สะพานรุ่งอรุณ | 1 | 6497 |
| 12 | `bbell` | 30 สะพานรุ่งอรุณ | 1 | 6498 |

## sheet_04.png — ซากอารัณยา
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `alamp` | 32 ซากอารัณยา | 23 | 7184 |
| 2 | `ashr` | 32 ซากอารัณยา | 5 | 7174 |
| 3 | `ahouse` | 32 ซากอารัณยา | 4 | 7155 |
| 4 | `abook` | 32 ซากอารัณยา | 4 | 7161 |
| 5 | `aroot` | 32 ซากอารัณยา | 4 | 7163 |
| 6 | `abell` | 32 ซากอารัณยา | 3 | 7178 |
| 7 | `agbell` | 32 ซากอารัณยา | 1 | 7149 |
| 8 | `aclock` | 32 ซากอารัณยา | 1 | 7166 |
| 9 | `aves` | 32 ซากอารัณยา | 1 | 7355 |

## sheet_05.png — หลุมหัวใจว่าง
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `hgear` | 33 หลุมหัวใจว่าง | 10 | 7505 |
| 2 | `hanc` | 33 หลุมหัวใจว่าง | 4 | 7499 |
| 3 | `hbellf` | 33 หลุมหัวใจว่าง | 3 | 7506 |
| 4 | `htb` | 33 หลุมหัวใจว่าง | 3 | 9704 |
| 5 | `hves` | 33 หลุมหัวใจว่าง | 1 | 7507 |

## sheet_06.png — ที่ราบดาวตก
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `sfgt` | 34 ที่ราบดาวตก | 34 | 8350 |
| 2 | `sfcry` | 34 ที่ราบดาวตก | 34 | 8354 |
| 3 | `u22menh` | 34 ที่ราบดาวตก | 30 | 11934 |
| 4 | `u22lily` | 34 ที่ราบดาวตก | 30 | 11936 |
| 5 | `sfflw` | 34 ที่ราบดาวตก | 20 | 9917 |
| 6 | `sfdeb` | 34 ที่ราบดาวตก | 16 | 9913 |
| 7 | `u22met` | 34 ที่ราบดาวตก | 10 | 11930 |
| 8 | `sfmet` | 34 ที่ราบดาวตก | 5 | 8346 |
| 9 | `sftent` | 34 ที่ราบดาวตก | 3 | 8355 |
| 10 | `sfban` | 34 ที่ราบดาวตก | 3 | 8362 |
| 11 | `sftel` | 34 ที่ราบดาวตก | 1 | 8358 |
| 12 | `sftab` | 34 ที่ราบดาวตก | 1 | 8361 |

## sheet_07.png — ปากเหวแผ่นดินทรุด
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `paoak` | 43 ปากเหวแผ่นดินทรุด | 30 | 30040 |
| 2 | `pabush` | 43 ปากเหวแผ่นดินทรุด | 30 | 30044 |
| 3 | `parock` | 43 ปากเหวแผ่นดินทรุด | 26 | 30042 |
| 4 | `paflag` | 43 ปากเหวแผ่นดินทรุด | 22 | 30034 |
| 5 | `paltree` | 43 ปากเหวแผ่นดินทรุด | 12 | 30035 |
| 6 | `pafence` | 43 ปากเหวแผ่นดินทรุด | 10 | 30028 |
| 7 | `palamp` | 43 ปากเหวแผ่นดินทรุด | 8 | 30031 |
| 8 | `patent` | 43 ปากเหวแผ่นดินทรุด | 5 | 30008 |
| 9 | `pagfen` | 43 ปากเหวแผ่นดินทรุด | 5 | 30046 |
| 10 | `paroot` | 43 ปากเหวแผ่นดินทรุด | 5 | 30054 |
| 11 | `pacrate` | 43 ปากเหวแผ่นดินทรุด | 3 | 30021 |
| 12 | `pasack` | 43 ปากเหวแผ่นดินทรุด | 3 | 30022 |

## sheet_08.png — สุสานเรือเมฆ
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `sgstone` | 39 สุสานเรือเมฆ | 34 | 26997 |
| 2 | `sglamp` | 39 สุสานเรือเมฆ | 9 | 27000 |
| 3 | `sgmast` | 39 สุสานเรือเมฆ | 7 | 26984 |
| 4 | `sgrib` | 39 สุสานเรือเมฆ | 7 | 26992 |
| 5 | `phbarrel` | 39 สุสานเรือเมฆ | 4 | 21171 |
| 6 | `phrope` | 39 สุสานเรือเมฆ | 1 | 21173 |
| 7 | `sgboat` | 39 สุสานเรือเมฆ | 1 | 27003 |
| 8 | `sgbk` | 39 สุสานเรือเมฆ | 1 | 27007 |
| 9 | `sgtil` | 39 สุสานเรือเมฆ | 1 | 27010 |
| 10 | `sggrif` | 39 สุสานเรือเมฆ | 1 | 27011 |

## sheet_09.png — ปากเหวแผ่นดินทรุด
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `patarp` | 43 ปากเหวแผ่นดินทรุด | 3 | 30048 |
| 2 | `pafire` | 43 ปากเหวแผ่นดินทรุด | 1 | 30017 |
| 3 | `papen` | 43 ปากเหวแผ่นดินทรุด | 1 | 30023 |
| 4 | `pasign` | 43 ปากเหวแผ่นดินทรุด | 1 | 30026 |
| 5 | `patil` | 43 ปากเหวแผ่นดินทรุด | 1 | 30055 |

## sheet_10.png — ฐานแผ่นดิน
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `pbshroom` | 45 ฐานแผ่นดิน | 21 | 30559 |
| 2 | `pzcry` | 45 ฐานแผ่นดิน | 16 | 31378 |
| 3 | `pzrock` | 45 ฐานแผ่นดิน | 12 | 31375 |
| 4 | `pzpod` | 45 ฐานแผ่นดิน | 12 | 31381 |
| 5 | `pzjn` | 45 ฐานแผ่นดิน | 5 | 31360 |
| 6 | `pzthr` | 45 ฐานแผ่นดิน | 1 | 31353 |
| 7 | `pzthu` | 45 ฐานแผ่นดิน | 1 | 31355 |
| 8 | `pzlift` | 45 ฐานแผ่นดิน | 1 | 31356 |

## sheet_11.png — สวนลอยแห่งราชินี
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `hedge` | 28 สวนลอยแห่งราชินี | 89 | 5864 |
| 2 | `thorn` | 28 สวนลอยแห่งราชินี | 31 | 5868 |
| 3 | `bal` | 28 สวนลอยแห่งราชินี | 15 | 5856 |
| 4 | `sft` | 28 สวนลอยแห่งราชินี | 11 | 5871 |
| 5 | `lant` | 28 สวนลอยแห่งราชินี | 6 | 5857 |
| 6 | `gcol` | 28 สวนลอยแห่งราชินี | 6 | 5884 |
| 7 | `rarch` | 28 สวนลอยแห่งราชินี | 3 | 5860 |
| 8 | `swing` | 28 สวนลอยแห่งราชินี | 1 | 5893 |
| 9 | `btree` | 28 สวนลอยแห่งราชินี | 1 | 5875 |
| 10 | `gst` | 28 สวนลอยแห่งราชินี | 1 | 5880 |
| 11 | `cocoon` | 28 สวนลอยแห่งราชินี | 1 | 5886 |

## sheet_12.png — ห้องบัลลังก์ดาว / ลานดาวลอย / วงแหวนเฟือง / ทุ่งตาข่ายดาว
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `pthr` | 29 ห้องบัลลังก์ดาว | 10 | 6126 |
| 2 | `chn` | 29 ห้องบัลลังก์ดาว | 6 | 6130 |
| 3 | `sthr` | 29 ห้องบัลลังก์ดาว | 1 | 6134 |
| 4 | `q9cr` | 40 ลานดาวลอย | 40 | 27981 |
| 5 | `q9lamp` | 40 ลานดาวลอย | 9 | 27990 |
| 6 | `q9gear` | 40 ลานดาวลอย | 4 | 27985 |
| 7 | `q9lad` | 40 ลานดาวลอย | 1 | 27993 |
| 8 | `q9tel` | 40 ลานดาวลอย | 1 | 27996 |
| 9 | `q9spire` | 40 ลานดาวลอย | 1 | 27998 |
| 10 | `q9tower` | 41 วงแหวนเฟือง | 1 | 28195 |
| 11 | `q9gate2` | 41 วงแหวนเฟือง | 1 | 28203 |
| 12 | `wb9coc` | 42 ทุ่งตาข่ายดาว | 1 | 28497 |

## sheet_13.png — ย่านวงแหวนล่าง
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `mlant` | 31 ย่านวงแหวนล่าง | 8 | 6932 |
| 2 | `meda` | 31 ย่านวงแหวนล่าง | 1 | 6925 |
| 3 | `mhed` | 31 ย่านวงแหวนล่าง | 1 | 6930 |
| 4 | `mfount` | 31 ย่านวงแหวนล่าง | 1 | 6935 |
| 5 | `mstage` | 31 ย่านวงแหวนล่าง | 1 | 6939 |
| 6 | `mgate` | 31 ย่านวงแหวนล่าง | 1 | 6943 |

## sheet_14.png — เหมืองดาวคาร์น
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `kbld` | 35 เหมืองดาวคาร์น | 30 | 8533 |
| 2 | `kjunk` | 35 เหมืองดาวคาร์น | 22 | 9845 |
| 3 | `kcac` | 35 เหมืองดาวคาร์น | 12 | 8534 |
| 4 | `kwood` | 35 เหมืองดาวคาร์น | 10 | 9831 |
| 5 | `kspire` | 35 เหมืองดาวคาร์น | 9 | 9823 |
| 6 | `kbox` | 35 เหมืองดาวคาร์น | 9 | 9835 |
| 7 | `kframe` | 35 เหมืองดาวคาร์น | 6 | 9840 |

## sheet_15.png — ผาท่าเรือเมฆ
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `phtree` | 38 ผาท่าเรือเมฆ | 46 | 21178 |
| 2 | `phlamp` | 38 ผาท่าเรือเมฆ | 35 | 21174 |
| 3 | `phbush` | 38 ผาท่าเรือเมฆ | 30 | 21184 |
| 4 | `phrock` | 38 ผาท่าเรือเมฆ | 24 | 21182 |
| 5 | `phship` | 38 ผาท่าเรือเมฆ | 4 | 21335 |
| 6 | `phring` | 38 ผาท่าเรือเมฆ | 4 | 21344 |
| 7 | `phskiff` | 38 ผาท่าเรือเมฆ | 1 | 21164 |
| 8 | `phbk` | 38 ผาท่าเรือเมฆ | 1 | 21336 |

## sheet_16.png — นครรากลึก / ลานหอคอยวิญญาณ / ดินแดนหลังรอยแยก
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `pbpil` | 44 นครรากลึก | 8 | 30521 |
| 2 | `pbtrunk` | 44 นครรากลึก | 5 | 30518 |
| 3 | `pbmouth` | 44 นครรากลึก | 5 | 30532 |
| 4 | `pblift` | 44 นครรากลึก | 1 | 30561 |
| 5 | `pbthu` | 44 นครรากลึก | 1 | 30565 |
| 6 | `u22slamp` | 05 ลานหอคอยวิญญาณ | 16 | 11939 |
| 7 | `u22sobel` | 05 ลานหอคอยวิญญาณ | 10 | 11942 |
| 8 | `u22bench` | 05 ลานหอคอยวิญญาณ | 10 | 11945 |
| 9 | `u13vcry` | 11 ดินแดนหลังรอยแยก | 27 | 10946 |
| 10 | `u13obel` | 11 ดินแดนหลังรอยแยก | 16 | 10936 |
| 11 | `u13arch` | 11 ดินแดนหลังรอยแยก | 8 | 10941 |

## sheet_17.png — สะพานลมตะวันตก / ป่าผลึกสายฟ้า / หุบเหวลมหวน / บึงหมอกม่วง
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `u22chime` | 12 สะพานลมตะวันตก | 14 | 11950 |
| 2 | `u22rope` | 12 สะพานลมตะวันตก | 14 | 11953 |
| 3 | `u22mill` | 12 สะพานลมตะวันตก | 8 | 11947 |
| 4 | `u22bcry` | 16 ป่าผลึกสายฟ้า | 20 | 11925 |
| 5 | `u22rod` | 16 ป่าผลึกสายฟ้า | 12 | 11922 |
| 6 | `u22dbush` | 17 หุบเหวลมหวน | 20 | 11965 |
| 7 | `u22hoodoo` | 17 หุบเหวลมหวน | 14 | 11956 |
| 8 | `u22tumb` | 17 หุบเหวลมหวน | 10 | 11963 |
| 9 | `u22narch` | 17 หุบเหวลมหวน | 5 | 11960 |
| 10 | `u13shr` | 20 บึงหมอกม่วง | 36 | 10973 |
| 11 | `u13dtree` | 20 บึงหมอกม่วง | 21 | 10963 |
| 12 | `u13lamp` | 20 บึงหมอกม่วง | 20 | 10969 |

## sheet_18.png — ซากนครใต้เมฆ / ห้วงบัลลังก์เงา
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `u22clamp` | 21 ซากนครใต้เมฆ | 16 | 11906 |
| 2 | `u22tcol` | 21 ซากนครใต้เมฆ | 14 | 11896 |
| 3 | `u22arch` | 21 ซากนครใต้เมฆ | 8 | 11899 |
| 4 | `u22head` | 21 ซากนครใต้เมฆ | 8 | 11903 |
| 5 | `u13col` | 22 ห้วงบัลลังก์เงา | 26 | 10949 |
| 6 | `u13braz` | 22 ห้วงบัลลังก์เงา | 22 | 10957 |
| 7 | `u13ban` | 22 ห้วงบัลลังก์เงา | 14 | 10960 |
| 8 | `u13knt` | 22 ห้วงบัลลังก์เงา | 11 | 10953 |

## sheet_19.png — สุสานอัศวินร้อยดวง / แกนพิภพ
| cell | key | map | copies | code line |
|---|---|---|---|---|
| 1 | `u22swd` | 25 สุสานอัศวินร้อยดวง | 26 | 11909 |
| 2 | `u22tomb` | 25 สุสานอัศวินร้อยดวง | 16 | 11912 |
| 3 | `u22cand` | 25 สุสานอัศวินร้อยดวง | 16 | 11919 |
| 4 | `u22wisp` | 25 สุสานอัศวินร้อยดวง | 10 | 11920 |
| 5 | `u22maus` | 25 สุสานอัศวินร้อยดวง | 5 | 11915 |
| 6 | `u13obs` | 26 แกนพิภพ | 28 | 10983 |
| 7 | `u13vent` | 26 แกนพิภพ | 24 | 10981 |
| 8 | `u13basc` | 26 แกนพิภพ | 22 | 10975 |
| 9 | `u13geo` | 26 แกนพิภพ | 16 | 10979 |

## sheet_20_trees_map02.png — หุบเขากระดูก  (natural trees & props of this field map)
Map 02. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map02_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_21_trees_map03.png — ดินแดนเพลิงนรก  (natural trees & props of this field map)
Map 03. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map03_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_22_trees_map04.png — วิหารน้ำแข็งนิรันดร์  (natural trees & props of this field map)
Map 04. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map04_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_23_trees_map05.png — ลานหอคอยวิญญาณ  (natural trees & props of this field map)
Map 05. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map05_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_24_trees_map06.png — ซากนครจมบาดาล  (natural trees & props of this field map)
Map 06. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map06_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_25_trees_map07.png — เหมืองทองร้าง  (natural trees & props of this field map)
Map 07. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map07_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_26_trees_map08.png — ทะเลทรายสุสานฟาโรห์  (natural trees & props of this field map)
Map 08. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map08_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_27_trees_map10.png — ทุ่งรอยแยกนภา  (natural trees & props of this field map)
Map 10. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map10_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_28_trees_map11.png — ดินแดนหลังรอยแยก  (natural trees & props of this field map)
Map 11. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map11_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_29_trees_map12.png — สะพานลมตะวันตก  (natural trees & props of this field map)
Map 12. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map12_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_30_trees_map13.png — สวนลอยฟ้าร้าง  (natural trees & props of this field map)
Map 13. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map13_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_31_trees_map14.png — หอนาฬิกาเมฆ  (natural trees & props of this field map)
Map 14. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map14_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_32_trees_map15.png — ทะเลสาบดาวตก  (natural trees & props of this field map)
Map 15. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map15_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_33_trees_map16.png — ป่าผลึกสายฟ้า  (natural trees & props of this field map)
Map 16. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map16_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_34_trees_map17.png — หุบเหวลมหวน  (natural trees & props of this field map)
Map 17. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map17_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_35_trees_map18.png — ซากวิหารพายุ  (natural trees & props of this field map)
Map 18. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map18_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_36_trees_map19.png — ป่าเห็ดเรืองแสง  (natural trees & props of this field map)
Map 19. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map19_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_37_trees_map20.png — บึงหมอกม่วง  (natural trees & props of this field map)
Map 20. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map20_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_38_trees_map21.png — ซากนครใต้เมฆ  (natural trees & props of this field map)
Map 21. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map21_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_39_trees_map22.png — ห้วงบัลลังก์เงา  (natural trees & props of this field map)
Map 22. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map22_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_40_trees_map23.png — โพรงรากหิน  (natural trees & props of this field map)
Map 23. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map23_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_41_trees_map24.png — ทะเลสาบใต้ดินเรืองแสง  (natural trees & props of this field map)
Map 24. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map24_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_42_trees_map25.png — สุสานอัศวินร้อยดวง  (natural trees & props of this field map)
Map 25. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map25_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.

## sheet_43_trees_map26.png — แกนพิภพ  (natural trees & props of this field map)
Map 26. Cells 1–6: six different trees/large plants fitting this map's biome (see screenshots/map26_1.jpg and the tree code `mxTree` / theme in index.html). Cells 7–12: six ground props (rocks, bushes, small ruins, crystals…) for the same biome.
