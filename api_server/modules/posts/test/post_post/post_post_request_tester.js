// handle unit tests for the "POST /posts" request

'use strict';

const PostToChannelTest = require('./post_to_channel_test');
const PostToDirectTest = require('./post_to_direct_test');
const PostToFileStreamTest = require('./post_to_file_stream_test');
const PostReplyTest = require('./post_reply_test');
const NoStreamIdTest = require('./no_stream_id_test');
const InvalidStreamIdTest = require('./invalid_stream_id_test');
const DuplicateFileStreamTest = require('./codemarks/duplicate_file_stream_test');
const ACLTeamTest = require('./acl_team_test');
const ACLStreamTest = require('./acl_stream_test');
const NewPostMessageToTeamStreamTest = require('./new_post_message_to_team_stream_test');
const NewPostMessageToChannelTest = require('./new_post_message_to_channel_test');
const NewPostMessageToDirectTest = require('./new_post_message_to_direct_test');
const NewPostNoMessageToChannelTest = require('./new_post_no_message_to_channel_test');
const NewPostNoMessageToDirectTest = require('./new_post_no_message_to_direct_test');
const NewFileStreamMessageToTeamTest = require('./new_file_stream_message_to_team_test');
const NewMarkerStreamMessageToTeamTest = require('./new_marker_stream_message_to_team_test');
const MostRecentPostTest = require('./most_recent_post_test');
const LastReadsNoneTest = require('./last_reads_none_test');
const NoLastReadsForAuthorTest = require('./no_last_reads_for_author_test');
const LastReadsPreviousPostTest = require('./last_reads_previous_post_test');
const NoLastReadsUpdateTest = require('./no_last_reads_update_test');
const SeqNumTest = require('./seqnum_test');
const NumRepliesTest = require('./num_replies_test');
const SecondReplyTest = require('./second_reply_test');
const NumRepliesMessageToStreamTest = require('./num_replies_message_to_stream_test');
const MentionTest = require('./mention_test');
const UnregisteredMentionTest = require('./unregistered_mention_test');
const MessageToAuthor = require('./message_to_author_test');
const OriginFromPluginTest = require('./origin_from_plugin_test');
const NoReplyToReplyTest = require('./no_reply_to_reply_test');

// concerning codemarks...
const CodemarkTest = require('./codemarks/codemark_test');
const CodemarkMarkerTest = require('./codemarks/codemark_marker_test');
const NoCodemarkTypeTest = require('./codemarks/no_codemark_type_test');
const NoCommitHashTest = require('./codemarks/no_commit_hash_test');
const NoCommitHashWithFileTest = require('./codemarks/no_commit_hash_with_file_test');
const NoCommitHashWithStreamTest = require('./codemarks/no_commit_hash_with_stream_test');
const NoCommitHashWithStreamIdTest = require('./codemarks/no_commit_hash_with_stream_id_test');
const MarkersNotArrayTest = require('./codemarks/markers_not_array_test');
const MarkersTooLongTest = require('./codemarks/markers_too_long_test');
const MarkerNotObjectTest = require('./codemarks/marker_not_object_test');
const MarkerTooBigTest = require('./codemarks/marker_too_big_test');
const MarkerAttributeRequiredTest = require('./codemarks/marker_attribute_required_test');
const LocationTooLongTest = require('./codemarks/location_too_long_test');
const LocationTooShortTest = require('./codemarks/location_too_short_test');
const LocationMustBeNumbersTest = require('./codemarks/location_must_be_numbers_test');
const InvalidCoordinateObjectTest = require('./codemarks/invalid_coordinate_object_test');
const NoLocationOkTest = require('./codemarks/no_location_ok_test');
const TooManyRemotesTest = require('./codemarks/too_many_remotes_test');
const TooManyKnownCommitHashesTest = require('./codemarks/too_many_known_commit_hashes_test');
const MarkerHasInvalidStreamIdTest = require('./codemarks/marker_has_invalid_stream_id_test');
const MarkerHasUnknownStreamIdTest = require('./codemarks/marker_has_unknown_stream_id_test');
const MarkerHasInvalidRepoIdTest = require('./codemarks/marker_has_invalid_repo_id_test');
const MarkerHasUnknownRepoIdTest = require('./codemarks/marker_has_unknown_repo_id_test');
const MarkerForBadStreamTypeTest = require('./codemarks/marker_for_bad_stream_type_test');
const MarkerFromDifferentTeamTest = require('./codemarks/marker_from_different_team_test');
const NumMarkersTest = require('./codemarks/num_markers_test');
const MarkerStreamOnTheFly = require('./codemarks/marker_stream_on_the_fly_test');
const FindRepoByRemotesTest = require('./codemarks/find_repo_by_remotes_test');
const FindRepoByKnownCommitHashesTest = require('./codemarks/find_repo_by_known_commit_hashes_test');
const FindRepoByCommitHashTest = require('./codemarks/find_repo_by_commit_hash_test');
const UpdateMatchedRepoWithRemotesTest = require('./codemarks/update_matched_repo_with_remotes_test');
const UpdateSetRepoWithRemotesTest = require('./codemarks/update_set_repo_with_remotes_test');
const CreateRepoOnTheFlyTest = require('./codemarks/create_repo_on_the_fly_test');
const CreateRepoOnTheFlyWithCommitHashesTest = require('./codemarks/create_repo_on_the_fly_with_commit_hashes_test');
const NewRepoMessageToTeamTest = require('./codemarks/new_repo_message_to_team_test');
const UpdatedSetRepoMessageTest = require('./codemarks/updated_set_repo_message_test');
const UpdatedMatchedRepoMessageTest = require('./codemarks/updated_matched_repo_message_test');
const CodemarkNumRepliesTest = require('./codemarks/codemark_num_replies_test');
const CodemarkSecondReplyTest = require('./codemarks/codemark_second_reply_test');
const NumRepliesToCodemarkMessageTest = require('./codemarks/num_replies_to_codemark_message_test');
const OnTheFlyMarkerStreamFromDifferentTeamTest = require('./codemarks/on_the_fly_marker_stream_from_different_team_test');
const OnTheFlyMarkerStreamRepoNotFoundTest = require('./codemarks/on_the_fly_marker_stream_repo_not_found_test');
const OnTheFlyMarkerStreamNoRemotesTest = require('./codemarks/on_the_fly_marker_stream_no_remotes_test');
const OnTheFlyMarkerStreamInvalidRepoIdTest = require('./codemarks/on_the_fly_marker_stream_invalid_repo_id_test');
const InvalidCodemarkTypeTest = require('./codemarks/invalid_codemark_type_test');
const ValidCodemarkTypeTest = require('./codemarks/valid_codemark_type_test');
const ValidCodemarkTypeWithMarkerTest = require('./codemarks/valid_codemark_type_with_marker_test');
const MarkerRequiredForCodemarkTest = require('./codemarks/marker_required_for_codemark_test');
const InvisibleCodemarkTypeTest = require('./codemarks/invisible_codemark_type_test');
const RequiredForCodemarkTypeTest = require('./codemarks/required_for_codemark_type_test');
const RequiredForCodemarkTypeWithMarkerTest = require('./codemarks/required_for_codemark_type_with_marker_test');
const IssueWithAssigneesTest = require('./codemarks/issue_with_assignees_test');
const InvalidAssigneeTest = require('./codemarks/invalid_assignee_test');
const AssigneeNotOnTeamTest = require('./codemarks/assignee_not_on_team_test');
const AssigneesIgnoredTest = require('./codemarks/assignees_ignored_test');
const ParentPostIdTest = require('./codemarks/parent_post_id_test');
const CodemarkOriginTest = require('./codemarks/codemark_origin_test');
const PermalinkTest = require('./codemarks/permalink_test');
const DuplicateLinkTest = require('./codemarks/duplicate_link_test');
const RelatedCodemarksTest = require('./codemarks/related_codemarks_test');
const RelatedCodemarkNotFoundTest = require('./codemarks/related_codemark_not_found_test');
const RelatedCodemarkACLTest = require('./codemarks/related_codemark_acl_test');
const RelatedCodemarksDifferentTeamTest = require('./codemarks/related_codemarks_different_team_test');
const TagsTest = require('./codemarks/tags_test');
const TagNotFoundTest = require('./codemarks/tag_not_found_test');
const DeactivatedTagTest = require('./codemarks/deactivated_tag_test');
const DeactivatedDefaultTagTest = require('./codemarks/deactivated_default_tag_test');
const CodemarkColorBecomesTagTest = require('./codemarks/codemark_color_becomes_tag_test');
const CodemarkWithReferenceLocationsTest = require('./codemarks/codemark_with_reference_locations_test');
const CodemarkWithNoCommitHashInReferenceLocation = require('./codemarks/codemark_with_no_commit_hash_in_reference_location_test');
const CodemarkWithInvalidCommitHashInReferenceLocation = require('./codemarks/codemark_with_invalid_commit_hash_in_reference_location_test');
const CodemarkWithEmptyCommitHashInReferenceLocation = require('./codemarks/codemark_with_empty_commit_hash_in_reference_location_test');
const CodemarkWithNoLocationInReferenceLocationTest = require('./codemarks/codemark_with_no_location_in_reference_location_test');
const CodemarkWithInvalidLocationInReferenceLocationTest = require('./codemarks/codemark_with_invalid_location_in_reference_location_test');
const MultipleMarkersTest = require('./codemarks/multiple_markers_test');
const MultipleMarkersStreamOnTheFlyTest = require('./codemarks/multiple_markers_stream_on_the_fly_test');
const AddFollowersTest = require('./codemarks/add_followers_test');
const AddCreatorAsFollowerTest = require('./codemarks/add_creator_as_follower_test');
const InvalidFollowerTest = require('./codemarks/invalid_follower_test');
const FollowerNotOnTeamTest = require('./codemarks/follower_not_on_team_test');
const FollowersFromDirectStreamTest = require('./codemarks/followers_from_direct_stream_test');
const FollowersMentionedTest = require('./codemarks/followers_mentioned_test');
const FollowingFromReplyTest = require('./codemarks/following_from_reply_test');
const InvalidMentionTest = require('./codemarks/invalid_mention_test');
const MentionedNotOnTeamTest = require('./codemarks/mentioned_not_on_team_test');
const FollowByPreferenceAllTest = require('./codemarks/follow_by_preference_all_test');
const FollowByPreferenceCreationTest = require('./codemarks/follow_by_preference_creation_test');
const FollowByPreferenceMentionTest = require('./codemarks/follow_by_preference_mention_test');
const FollowByPreferenceDirectStreamTest = require('./codemarks/follow_by_preference_direct_stream_test');
const FollowByPreferenceRepliesTest = require('./codemarks/follow_by_preference_replies_test');
const NoFollowAllByPreference = require('./codemarks/no_follow_all_by_preference_test');
const NoFollowCreationByPreferenceTest = require('./codemarks/no_follow_creation_by_preference_test');
const NoFollowDirectStreamByPreferenceTest = require('./codemarks/no_follow_direct_stream_by_preference_test');
const NoFollowMentionByPreferenceTest = require('./codemarks/no_follow_mention_by_preference_test');
const NoFollowRepliesByPreferenceTest = require('./codemarks/no_follow_replies_by_preference_test');

// concerning reviews...
const ReviewTest = require('./reviews/review_test');
const ReviewMarkersTest = require('./reviews/review_markers_test');
const NoReviewCommitHashTest = require('./reviews/no_review_commit_hash_test');
const ReviewMarkersNotArrayTest = require('./reviews/review_markers_not_array_test');
const ReviewMarkersTooLongTest = require('./reviews/review_markers_too_long_test');
const ReviewMarkerAttributeRequiredTest = require('./reviews/review_marker_attribute_required_test');
const NoReviewLocationOkTest = require('./reviews/no_review_location_ok_test');
const ReviewMarkerHasInvalidStreamIdTest = require('./reviews/review_marker_has_invalid_stream_id_test');
const ReviewMarkerHasInvalidRepoIdTest = require('./reviews/review_marker_has_invalid_repo_id_test');
const ReviewMarkerFromDifferentTeamTest = require('./reviews/review_marker_from_different_team_test');
const ReviewNumMarkersTest = require('./reviews/review_num_markers_test');
const ReviewMarkerStreamOnTheFlyTest = require('./reviews/review_marker_stream_on_the_fly_test');
const ReviewCreateRepoOnTheFlyTest = require('./reviews/review_create_repo_on_the_fly_test');
const ReviewNewRepoMessageToTeamTest = require('./reviews/review_new_repo_message_to_team_test');
const ReviewUpdatedSetRepoMessageTest = require('./reviews/review_updated_set_repo_message_test');
const ReviewNumRepliesTest = require('./reviews/review_num_replies_test');
const ReviewSecondReplyTest = require('./reviews/review_second_reply_test');
const OnTheFlyReviewMarkerStreamFromDifferentTeamTest = require('./reviews/on_the_fly_review_marker_stream_from_different_team_test');
const ReviewersTest = require('./reviews/reviewers_test');
const InvalidReviewerTest = require('./reviews/invalid_reviewer_test');
const ReviewerNotOnTeamTest = require('./reviews/reviewer_not_on_team_test');
const ReviewOriginTest = require('./reviews/review_origin_test');
const ReviewTagsTest = require('./reviews/review_tags_test');
const ReviewTagNotFoundTest = require('./reviews/review_tag_not_found_test');
const ReviewDeactivatedTagTest = require('./reviews/review_deactivated_tag_test');
const ReviewDeactivatedDefaultTagTest = require('./reviews/review_deactivated_default_tag_test');
const AddReviewFollowersTest = require('./reviews/add_review_followers_test');
const AddReviewCreatorAsFollowerTest = require('./reviews/add_review_creator_as_follower_test');
const InvalidReviewFollowerTest = require('./reviews/invalid_review_follower_test');
const ReviewFollowerNotOnTeamTest = require('./reviews/review_follower_not_on_team_test');
const ReviewFollowersFromDirectStreamTest = require('./reviews/review_followers_from_direct_stream_test');
const ReviewFollowersMentionedTest = require('./reviews/review_followers_mentioned_test');
const FollowingReviewFromReplyTest = require('./reviews/following_review_from_reply_test');
const InvalidReviewMentionTest = require('./reviews/invalid_review_mention_test');
const ReviewMentionedNotOnTeamTest = require('./reviews/review_mentioned_not_on_team_test');
const FollowReviewByPreferenceAllTest = require('./reviews/follow_review_by_preference_all_test');
const FollowReviewByPreferenceCreationTest = require('./reviews/follow_review_by_preference_creation_test');
const FollowReviewByPreferenceMentionTest = require('./reviews/follow_review_by_preference_mention_test');
const FollowReviewByPreferenceDirectStreamTest = require('./reviews/follow_review_by_preference_direct_stream_test');
const FollowReviewByPreferenceRepliesTest = require('./reviews/follow_review_by_preference_replies_test');
const NoFollowAllReviewsByPreference = require('./reviews/no_follow_all_reviews_by_preference_test');
const NoFollowReviewCreationByPreferenceTest = require('./reviews/no_follow_review_creation_by_preference_test');
const NoFollowReviewDirectStreamByPreferenceTest = require('./reviews/no_follow_review_direct_stream_by_preference_test');
const NoFollowReviewMentionByPreferenceTest = require('./reviews/no_follow_review_mention_by_preference_test');
const NoFollowReviewRepliesByPreferenceTest = require('./reviews/no_follow_review_replies_by_preference_test');
const NoReviewAndCodemarkTest = require('./reviews/no_review_and_codemark_test');
const NoReplyWithReviewTest = require('./reviews/no_reply_with_review_test');

class PostPostRequestTester {

	postPostTest () {
		new PostToChannelTest().test();
		new PostToDirectTest().test();
		new PostToFileStreamTest().test();	
		new PostReplyTest().test();
		new NoStreamIdTest().test();
		new InvalidStreamIdTest().test();
		new DuplicateFileStreamTest().test();
		new ACLStreamTest().test();
		new ACLTeamTest().test();
		new NewPostMessageToTeamStreamTest().test();
		new NewPostMessageToChannelTest().test();
		new NewPostMessageToDirectTest().test();
		new NewPostNoMessageToChannelTest().test();
		new NewPostNoMessageToDirectTest().test();
		new NewFileStreamMessageToTeamTest().test();
		new NewMarkerStreamMessageToTeamTest().test();
		new MostRecentPostTest().test();
		new LastReadsNoneTest({ type: 'direct' }).test();
		new LastReadsNoneTest({ type: 'channel' }).test();
		new NoLastReadsForAuthorTest().test();
		new LastReadsPreviousPostTest({ type: 'direct' }).test();
		new LastReadsPreviousPostTest({ type: 'channel' }).test();
		new NoLastReadsUpdateTest().test();
		new SeqNumTest().test();
		new NumRepliesTest().test();
		new SecondReplyTest().test();
		new NumRepliesMessageToStreamTest({ type: 'direct' }).test();
		new NumRepliesMessageToStreamTest({ type: 'channel' }).test();
		new NumRepliesToCodemarkMessageTest({ type: 'direct' }).test();
		new NumRepliesToCodemarkMessageTest({ type: 'channel' }).test();
		new MentionTest().test();
		new UnregisteredMentionTest().test();
		new MessageToAuthor().test();
		new OriginFromPluginTest().test();
		new NoReplyToReplyTest().test();
		new InvalidMentionTest().test();
		new MentionedNotOnTeamTest().test();

		// concerning codemarks...
		new CodemarkTest().test();
		new CodemarkMarkerTest().test();
		new NoCodemarkTypeTest().test();
		new NoCommitHashTest().test();
		new NoCommitHashWithFileTest().test();
		new NoCommitHashWithStreamTest().test();
		new NoCommitHashWithStreamIdTest().test();
		new MarkersNotArrayTest().test();
		new MarkersTooLongTest().test();
		new MarkerNotObjectTest().test();
		new MarkerTooBigTest().test();
		new MarkerAttributeRequiredTest({ attribute: 'code' }).test();
		new LocationTooLongTest().test();
		new LocationTooShortTest().test();
		new LocationMustBeNumbersTest().test();
		new InvalidCoordinateObjectTest().test();
		new NoLocationOkTest().test();
		new TooManyRemotesTest().test();
		new TooManyKnownCommitHashesTest().test();
		new MarkerHasInvalidStreamIdTest().test();
		new MarkerHasUnknownStreamIdTest().test();
		new MarkerHasInvalidRepoIdTest().test();
		new MarkerHasUnknownRepoIdTest().test();
		new MarkerForBadStreamTypeTest({ streamType: 'direct' }).test();
		new MarkerForBadStreamTypeTest({ streamType: 'channel' }).test();
		new MarkerFromDifferentTeamTest().test();
		new NumMarkersTest().test();
		new MarkerStreamOnTheFly({ streamType: 'direct' }).test();
		new MarkerStreamOnTheFly({ streamType: 'channel' }).test();
		new FindRepoByRemotesTest().test();
		new FindRepoByKnownCommitHashesTest().test();
		new FindRepoByCommitHashTest().test();
		new UpdateMatchedRepoWithRemotesTest().test();
		new UpdateSetRepoWithRemotesTest().test();
		new CreateRepoOnTheFlyTest().test();
		new CreateRepoOnTheFlyWithCommitHashesTest().test();
		new NewRepoMessageToTeamTest().test();
		new UpdatedSetRepoMessageTest().test();
		new UpdatedMatchedRepoMessageTest().test();
		new CodemarkNumRepliesTest().test();
		new CodemarkSecondReplyTest().test();
		new OnTheFlyMarkerStreamFromDifferentTeamTest().test();
		new OnTheFlyMarkerStreamRepoNotFoundTest().test();
		new OnTheFlyMarkerStreamNoRemotesTest().test();
		new OnTheFlyMarkerStreamInvalidRepoIdTest().test();
		new InvalidCodemarkTypeTest().test();
		new ValidCodemarkTypeTest({ codemarkType: 'issue' }).test();
		new ValidCodemarkTypeTest({ codemarkType: 'question' }).test();
		new ValidCodemarkTypeWithMarkerTest({ codemarkType: 'bookmark' }).test();
		new ValidCodemarkTypeWithMarkerTest({ codemarkType: 'trap' }).test();
		new ValidCodemarkTypeWithMarkerTest({ codemarkType: 'link' }).test();
		new RequiredForCodemarkTypeTest({ codemarkType: 'comment', attribute: 'text' }).test();
		new RequiredForCodemarkTypeWithMarkerTest({ codemarkType: 'bookmark', attribute: 'title' }).test();
		new RequiredForCodemarkTypeWithMarkerTest({ codemarkType: 'trap', attribute: 'text' }).test();
		new RequiredForCodemarkTypeTest({ codemarkType: 'question', attribute: 'title' }).test();
		new RequiredForCodemarkTypeTest({ codemarkType: 'issue', attribute: 'title' }).test();
		new MarkerRequiredForCodemarkTest({ codemarkType: 'bookmark' }).test();
		new MarkerRequiredForCodemarkTest({ codemarkType: 'trap' }).test();
		new MarkerRequiredForCodemarkTest({ codemarkType: 'link' }).test();
		new InvisibleCodemarkTypeTest({ codemarkType: 'link', attribute: 'text' }).test();
		new InvisibleCodemarkTypeTest({ codemarkType: 'link', attribute: 'title' }).test();
		new IssueWithAssigneesTest().test();
		new InvalidAssigneeTest().test();
		new AssigneeNotOnTeamTest().test();
		new AssigneesIgnoredTest().test();
		new ParentPostIdTest().test();
		new CodemarkOriginTest().test();
		new PermalinkTest({ permalinkType: 'public' }).test();
		new PermalinkTest({ permalinkType: 'private' }).test();
		new DuplicateLinkTest({ permalinkType: 'public' }).test();
		new DuplicateLinkTest({ permalinkType: 'private' }).test();
		new RelatedCodemarksTest().test();
		new RelatedCodemarkNotFoundTest().test();
		new RelatedCodemarkACLTest().test();
		new RelatedCodemarksDifferentTeamTest().test();
		new TagsTest().test();
		new TagNotFoundTest().test();
		new DeactivatedTagTest().test();
		new DeactivatedDefaultTagTest().test();
		new CodemarkColorBecomesTagTest().test();
		new CodemarkWithReferenceLocationsTest().test();
		new CodemarkWithNoCommitHashInReferenceLocation().test();
		new CodemarkWithInvalidCommitHashInReferenceLocation().test();
		new CodemarkWithEmptyCommitHashInReferenceLocation().test();
		new CodemarkWithNoLocationInReferenceLocationTest().test();
		new CodemarkWithInvalidLocationInReferenceLocationTest().test();
		new MultipleMarkersTest().test();
		new MultipleMarkersStreamOnTheFlyTest().test();
		new AddFollowersTest().test();
		new AddCreatorAsFollowerTest().test();
		new InvalidFollowerTest().test();
		new FollowerNotOnTeamTest().test();
		new FollowersFromDirectStreamTest().test();
		new FollowersMentionedTest().test();
		new FollowingFromReplyTest().test();
		new FollowByPreferenceAllTest().test();
		new FollowByPreferenceCreationTest().test();
		new FollowByPreferenceMentionTest().test();
		new FollowByPreferenceDirectStreamTest().test();
		new FollowByPreferenceRepliesTest().test();
		new NoFollowAllByPreference().test();
		new NoFollowCreationByPreferenceTest().test();
		new NoFollowDirectStreamByPreferenceTest().test();
		new NoFollowMentionByPreferenceTest().test();
		new NoFollowRepliesByPreferenceTest().test();
		
		// concerning reviews...
		// we do a subset of the tests for codemarks, assuming that marker validation 
		// between the two API calls is basically the same
		new ReviewTest().test();
		new ReviewMarkersTest().test();
		new NoReviewCommitHashTest().test();
		new ReviewMarkersNotArrayTest().test();
		new ReviewMarkersTooLongTest().test();
		new ReviewMarkerAttributeRequiredTest({ attribute: 'code' }).test();
		new NoReviewLocationOkTest().test();
		new ReviewMarkerHasInvalidStreamIdTest().test();
		new ReviewMarkerHasInvalidRepoIdTest().test();
		new ReviewMarkerFromDifferentTeamTest().test();
		new ReviewNumMarkersTest().test();
		new ReviewMarkerStreamOnTheFlyTest({ streamType: 'channel' }).test();
		new ReviewMarkerStreamOnTheFlyTest({ streamType: 'direct' }).test();
		new ReviewCreateRepoOnTheFlyTest().test();
		new ReviewNewRepoMessageToTeamTest().test();
		new ReviewUpdatedSetRepoMessageTest().test();
		new ReviewNumRepliesTest().test();
		new ReviewSecondReplyTest().test();
		new OnTheFlyReviewMarkerStreamFromDifferentTeamTest().test();
		new ReviewersTest().test();
		new InvalidReviewerTest().test();
		new ReviewerNotOnTeamTest().test();
		new ReviewOriginTest().test();
		new ReviewTagsTest().test();
		new ReviewTagNotFoundTest().test();
		new ReviewDeactivatedTagTest().test();
		new ReviewDeactivatedDefaultTagTest().test();
		new AddReviewFollowersTest().test();
		new AddReviewCreatorAsFollowerTest().test();
		new InvalidReviewFollowerTest().test();
		new ReviewFollowerNotOnTeamTest().test();
		new ReviewFollowersFromDirectStreamTest().test();
		new ReviewFollowersMentionedTest().test();
		new FollowingReviewFromReplyTest().test();
		new InvalidReviewMentionTest().test();
		new ReviewMentionedNotOnTeamTest().test();
		new FollowReviewByPreferenceAllTest().test();
		new FollowReviewByPreferenceCreationTest().test();
		new FollowReviewByPreferenceMentionTest().test();
		new FollowReviewByPreferenceDirectStreamTest().test();
		new FollowReviewByPreferenceRepliesTest().test();
		new NoFollowAllReviewsByPreference().test();
		new NoFollowReviewCreationByPreferenceTest().test();
		new NoFollowReviewDirectStreamByPreferenceTest().test();
		new NoFollowReviewMentionByPreferenceTest().test();
		new NoFollowReviewRepliesByPreferenceTest().test();
		new NoReviewAndCodemarkTest().test();
		new NoReplyWithReviewTest().test();
	}
}

module.exports = PostPostRequestTester;
