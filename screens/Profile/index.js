import { useRoute } from '@react-navigation/native'
import moment from 'moment';
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { images } from '../../utils/images';
import { width } from '../../utils/dimessions';
import { O2A } from 'object-to-array-convert';

const Profile = () => {
    const route = useRoute();
    const [inflate, setInflate] = useState(true);
    const [currentIdIndex, setCurrentIDIndex] = useState(0);
    const [currentBHYTIndex, setCurrentBHYTIndex] = useState(0);
    const [currentDriveLicenseIndex, setCurrentDriveLicenseIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [fullImageUrl, setFullImageUrl] = useState(null)
    const item = route.params?.data;
    return (
        <View style={{ width: '100%', paddingVertical: '10%', paddingHorizontal: '3%' }}>
            <View style={{ flexDirection: "row", paddingBottom: 15 }}>
                <View style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    <Image source={{ uri: "https://drive.google.com/thumbnail?id=" + item?.avatar } || images.avatar} style={{ resizeMode: "cover", width: 120, height: 120, borderRadius: 60 }} />
                </View>
                <View style={{ justifyContent: "center", paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item?.name}</Text>
                    <View style={{ width: "100%", height: 1, backgroundColor: "lightgrey" }} />
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Image source={images.birthday} style={{ resizeMode: "cover", width: 15, height: 15 }} />
                        <Text style={{ fontSize: 14, fontWeight: "normal", marginLeft: 10 }}>{item?.birthday}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Image source={images.adult} style={{ resizeMode: "cover", width: 15, height: 15 }} />
                        <Text style={{ fontSize: 14, fontWeight: "normal", marginLeft: 10 }}>{(moment().format("YYYY") - item?.birthday?.substring(6, item?.birthday?.length)) + ' Tuổi'}</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={6}>
                <View style={{ marginBottom: 100 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: "bold" }}>Căn cước công dân</Text>
                        <View style={{ width: "100%", height: 1, backgroundColor: "lightgrey", marginTop: 2 }} />
                        <ScrollView onScroll={(e) => setCurrentIDIndex(e.nativeEvent.contentOffset.x / width)} horizontal showsHorizontalScrollIndicator={false} style={{ width: width, marginVertical: 10 }} pagingEnabled>
                            <TouchableOpacity onPress={() => { setShowImageModal(true); setFullImageUrl(item?.cccd?.image?.before || null) }}>
                                {item?.cccd?.image?.before ? <Image source={{ uri: item?.cccd?.image?.before } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 160 }} />
                                    :
                                    <ActivityIndicator size="small" color={"grey"} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowImageModal(true); setFullImageUrl(item?.cccd?.image?.after || null) }}>
                                <Image source={{ uri: item?.cccd?.image?.after } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 160 }} />
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <View style={{ backgroundColor: currentIdIndex == 0 ? "grey" : "lightgrey", width: 7, height: 7, borderRadius: 3.5, marginRight: 5 }} />
                            <View style={{ backgroundColor: currentIdIndex == 1 ? "grey" : "lightgrey", width: 7, height: 7, borderRadius: 3.5 }} />
                        </View>
                        <View style={{ width: "80%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Số:</Text>
                                <Text style={{ marginVertical: 7 }}> {item?.cccd?.id}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginTop: 14, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Tạm trú:</Text>
                                <Text style={{ marginVertical: 7 }}> {item?.cccd?.temporaryAddress}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Giới tính:</Text>
                                <Text style={{ marginVertical: 7 }}> {item?.gender}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Quốc tịch:</Text>
                                <Text style={{ marginVertical: 7 }}> {item?.cccd?.nationality}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Quê quán:</Text>
                                <Text style={{ marginVertical: 7 }}> {item?.cccd?.hometown}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginTop: 14, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Thường trú:</Text>
                                <Text style={{ marginVertical: 7, marginRight: 20 }}> {item?.cccd?.permanentAddress}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: "bold" }}>Thông tin thuế</Text>
                        <View style={{ width: "100%", height: 1, backgroundColor: "lightgrey", marginTop: 2 }} />
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Số:</Text>
                            <Text style={{ marginVertical: 7 }}> {item?.tax?.code}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Nơi cấp:</Text>
                            <Text style={{ marginVertical: 7 }}> {item?.tax?.place}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Ghi chú:</Text>
                            <Text style={{ marginVertical: 7, width: Dimensions.get("screen").width / 1.5 }}> {item?.tax?.note}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: "bold" }}>Giấy phép lái xe</Text>
                        <View style={{ width: "100%", height: 1, backgroundColor: "lightgrey", marginTop: 2 }} />
                        <ScrollView onScroll={(e) => setCurrentDriveLicenseIndex(e.nativeEvent.contentOffset.x / width)} horizontal showsHorizontalScrollIndicator={false} style={{ width: width, marginVertical: 10 }} pagingEnabled>
                            <TouchableOpacity onPress={() => { setShowImageModal(true); setFullImageUrl(item?.drive?.image?.before || null) }}>
                                <Image source={{ uri: item?.drive?.image?.before } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 160 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowImageModal(true); setFullImageUrl(item?.drive?.image?.after || null) }}>
                                <Image source={{ uri: item?.drive?.image?.after } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 160 }} />
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <View style={{ backgroundColor: currentDriveLicenseIndex == 0 ? "grey" : "lightgrey", width: 7, height: 7, borderRadius: 3.5, marginRight: 5 }} />
                            <View style={{ backgroundColor: currentDriveLicenseIndex == 1 ? "grey" : "lightgrey", width: 7, height: 7, borderRadius: 3.5 }} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Số:</Text>
                            <Text style={{ marginVertical: 7 }}> {item?.drive?.no}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Hạng:</Text>
                            <Text style={{ marginVertical: 7 }}> {item?.drive?.class}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Ngày cấp:</Text>
                            <Text style={{ marginVertical: 7, width: Dimensions.get("screen").width / 1.5 }}> {item?.drive?.date}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontWeight: "bold" }}>Bảo hiểm y tế</Text>
                        <View style={{ width: "100%", height: 1, backgroundColor: "lightgrey", marginTop: 2 }} />
                        <ScrollView onScroll={(e) => setCurrentBHYTIndex(e.nativeEvent.contentOffset.x / width)} horizontal showsHorizontalScrollIndicator={false} style={{ width: width, marginVertical: 10 }} pagingEnabled>
                            <TouchableOpacity onPress={() => { setShowImageModal(true); setFullImageUrl(item?.bhyt?.image?.before || null) }}>
                                <Image source={{ uri: item?.bhyt?.image?.before } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 160 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowImageModal(true); setFullImageUrl(item?.bhyt?.image?.after || null) }}>
                                <Image source={{ uri: item?.bhyt?.image?.after } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 160 }} />
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <View style={{ backgroundColor: currentBHYTIndex == 0 ? "grey" : "lightgrey", width: 7, height: 7, borderRadius: 3.5, marginRight: 5 }} />
                            <View style={{ backgroundColor: currentBHYTIndex == 1 ? "grey" : "lightgrey", width: 7, height: 7, borderRadius: 3.5 }} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Số:</Text>
                            <Text style={{ marginVertical: 7, width: Dimensions.get("screen").width / 1.5 }}> {item?.bhyt?.code}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Hạn thẻ:</Text>
                            <Text style={{ marginVertical: 7, width: Dimensions.get("screen").width / 1.5 }}> {item?.bhyt?.expire}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Thời điểm đủ 5 năm:</Text>
                            <Text style={{ marginVertical: 7, width: Dimensions.get("screen").width / 1.5 }}>{`\n`} {item?.bhyt?.fullfiveyear}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginTop: 7, fontWeight: "bold", width: Dimensions.get("screen").width / 4 }}>Nơi DKKCB:</Text>
                            <Text style={{ marginVertical: 7, width: Dimensions.get("screen").width / 1.5 }}> {item?.bhyt?.kcbbd}</Text>
                        </View>
                    </View>

                    {/* residencyprocess */}
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontWeight: "bold" }}>Quá trình cư trú của bản thân</Text>
                        <View style={{ width: "100%", height: 1, backgroundColor: "lightgrey", marginTop: 2 }} />
                        <FlatList
                            data={Object.values(item?.residencyprocess).sort((a, b) => a.id - b.id)}
                            ListHeaderComponent={
                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{fontWeight:"bold"}}>{'STT'}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, marginRight: 3, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{fontWeight:"bold"}}>{'Thời gian'}</Text>
                                    </View>
                                    <View style={{ flex: 1, marginRight: 3, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{fontWeight:"bold"}}>{'Nơi thường trú/ Tạm trú'}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{fontWeight:"bold"}}>{'Nghề nghiệp, nơi làm việc'}</Text>
                                    </View>
                                </View>
                            }
                            extraData={Object.values(item?.residencyprocess)}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: "row", borderColor: "gray", paddingBottom: 5, borderWidth: 0.5 }}>
                                        <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                                            <Text>{item.id + 1}</Text>
                                        </View>
                                        <View style={{ flex: 0.5, marginRight: 3, justifyContent: "center", alignItems: "center" }}>
                                            <Text>{item.date}</Text>
                                        </View>
                                        <View style={{ flex: 1, marginRight: 3, justifyContent: "center", alignItems: "center" }}>
                                            <Text>{item.place}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text>{item.job}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>


            </ScrollView>
            <Modal visible={showImageModal} animationType="fade">
                <View onPress={() => setShowImageModal(!showImageModal)} style={{ flex: 1, backgroundColor: "black" }}></View>
                <View onTouchEnd={(e) => { setShowImageModal(!showImageModal) }} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                    <Image source={{ uri: fullImageUrl } || null} style={{ resizeMode: "contain", borderRadius: 13, width: width, height: 250 }} />
                </View>
                <View onPress={() => setShowImageModal(!showImageModal)} style={{ flex: 1, backgroundColor: "black" }}></View>
            </Modal>
        </View>
    )
}

export default Profile