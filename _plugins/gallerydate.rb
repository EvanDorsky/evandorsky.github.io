module Jekyll
  module GalleryDateFilter
    def gallerydate(datetime, f)
      today = Date.today
      yesterday = today - 1

      date = datetime.to_date
      days_elapsed = (today - date).to_i

      if datetime.day == today
        "Today"
      elsif datetime == yesterday
        "Yesterday"
      elsif days_elapsed < 7
        "#{days_elapsed} days ago"
      elsif datetime.year == today.year
        datetime.strftime("%b %-d")
      else
        datetime.year.to_s
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::GalleryDateFilter)